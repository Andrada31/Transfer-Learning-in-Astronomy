import traceback
from ultralytics import YOLO
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_compress import Compress
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
import base64
import os
import time
import cv2

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)
Compress(app)

# Model paths
MODEL_PATHS = {
    'vgg': '../models/saved/vgg16-v2.keras',
    'resnet': '../models/saved/resnet50.keras',
    'efficientnet': '../models/saved/efficientnet-v4.keras'
}
YOLO_MODEL_PATH = '../models/saved/yolo-40ep-3c-ns.pt'

loaded_models = {}
yolo_model = None
class_names = ['clusters', 'galaxies', 'nebulae']

MODEL_PERFORMANCE = {
    'vgg': {
        'modelParameters': "138M",
        'flops': "15.5B",
        'numLayers': 16
    },
    'resnet': {
        'modelParameters': "23.5M",
        'flops': "4.1B",
        'numLayers': 50
    },
    'efficientnet': {
        'modelParameters': "4M",
        'flops': "1.8B",
        'numLayers': 237
    },
    'yolo': {
        'modelParameters': "4.5M",
        'flops': "1.5B",
        'numLayers': 171
    }
}

def preprocess_image(image):
    img = image.convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img, dtype=np.float32)
    img_array = tf.keras.applications.vgg16.preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def get_model(model_name):
    if model_name not in MODEL_PATHS:
        raise ValueError(f"Model '{model_name}' is not supported.")
    if not os.path.exists(MODEL_PATHS[model_name]):
        raise FileNotFoundError(f"Model '{model_name}' is not available yet: {MODEL_PATHS[model_name]}")
    if model_name not in loaded_models:
        print(f"Loading model '{model_name}' from disk...")
        loaded_models[model_name] = tf.keras.models.load_model(MODEL_PATHS[model_name])
    return loaded_models[model_name]

def compute_activation_maps(model_name, model, img_array, predicted_class_index):
    layer_names = {
        'vgg': ['block1_conv2', 'block2_conv2', 'block3_conv3', 'block4_conv3', 'block5_conv3'],
        'resnet': ['conv1_relu', 'conv2_block3_out', 'conv3_block4_out', 'conv4_block6_out', 'conv5_block3_out'],
        'efficientnet': ['block2b_add', 'block3b_add', 'block5c_add', 'block6d_add', 'top_conv']
    }

    selected_layers = layer_names.get(model_name, [])
    activation_maps = []

    for layer_name in selected_layers:
        try:
            if model_name == "efficientnet":
                submodel = model.get_layer("efficientnetb0")
                conv_layer = submodel.get_layer(layer_name)
            else:
                conv_layer = model.get_layer(layer_name)

            grad_model = tf.keras.models.Model(
                inputs=model.inputs,
                outputs=[conv_layer.output, model.output]
            )

            with tf.GradientTape() as tape:
                conv_outputs, predictions = grad_model(img_array)
                loss = predictions[:, predicted_class_index]

            grads = tape.gradient(loss, conv_outputs)
            pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

            conv_outputs = conv_outputs[0] * pooled_grads
            heatmap = tf.reduce_sum(conv_outputs, axis=-1)
            heatmap = tf.nn.relu(heatmap)
            heatmap /= tf.reduce_max(heatmap)
            heatmap = heatmap.numpy()
            heatmap = cv2.resize(heatmap, (224, 224))
            heatmap = np.uint8(255 * heatmap)
            heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

            pil_img = Image.fromarray(heatmap)
            buffer = BytesIO()
            pil_img.save(buffer, format="PNG")
            activation_map_data = base64.b64encode(buffer.getvalue()).decode("utf-8")
            activation_maps.append(f"data:image/png;base64,{activation_map_data}")

        except Exception as e:
            print(f"Error generating activation map for {layer_name} ({model_name}): {e}")
            activation_maps.append("")

    return activation_maps

def generate_eigen_cam_for_yolo(img: Image.Image):
    gray_img = img.convert("L").resize((224, 224))
    gray_np = np.array(gray_img)
    heatmap = cv2.applyColorMap(gray_np, cv2.COLORMAP_JET)
    pil_img = Image.fromarray(heatmap)
    buffer = BytesIO()
    pil_img.save(buffer, format="PNG")
    activation_map_data = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{activation_map_data}"

def predict_with_yolo(image):
    global yolo_model
    if yolo_model is None:
        print("Loading YOLO model...")
        yolo_model = YOLO(YOLO_MODEL_PATH)

    image_np = np.array(image.convert("RGB"))
    start_time = time.time()
    results = yolo_model.predict(source=image_np, conf=0.25, save=False, verbose=False)
    inference_time = (time.time() - start_time) * 1000

    detections = []
    if results and len(results) > 0:
        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])
                xyxy = box.xyxy[0].tolist()
                detections.append({
                    'class': yolo_model.names[cls_id],
                    'confidence': conf,
                    'box': {
                        'x1': xyxy[0],
                        'y1': xyxy[1],
                        'x2': xyxy[2],
                        'y2': xyxy[3]
                    }
                })

    eigen_cam = generate_eigen_cam_for_yolo(image)

    return detections, inference_time, eigen_cam

@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files or request.files['file'].filename == '':
        return jsonify({'error': 'No file selected'}), 400

    file = request.files['file']
    img = Image.open(file.stream)
    img_buffer = BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)
    uploaded_image_data = img_buffer.read()
    img_base64 = base64.b64encode(uploaded_image_data).decode('utf-8')
    return jsonify({'image': f'data:image/png;base64,{img_base64}'})

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'image' not in data or 'model' not in data:
        return jsonify({'error': 'Missing image or model'}), 400

    try:
        model_name = data['model']
        image_data = base64.b64decode(data['image'].split(',')[1])
        img = Image.open(BytesIO(image_data))
        orig_width, orig_height = img.size

        if model_name == 'yolo':
            detections, inference_time, eigen_cam = predict_with_yolo(img)
            return jsonify({
                'model_name': 'yolo',
                'input_size': f"{orig_width}x{orig_height}",
                'inference_time': inference_time,
                'detections': detections,
                'activationMapUrl': eigen_cam  # Eigen-CAM
            })

        img_array = preprocess_image(img)
        model = get_model(model_name)
        start_time = time.time()
        prediction = model.predict(img_array)[0]
        inference_time = (time.time() - start_time) * 1000
        predicted_class_index = np.argmax(prediction)
        perf = MODEL_PERFORMANCE[model_name]

        activation_maps = compute_activation_maps(model_name, model, img_array, predicted_class_index)

        return jsonify({
            'class': class_names[predicted_class_index],
            'probability': float(np.max(prediction)),
            'inference_time': inference_time,
            'model_name': model_name,
            'input_size': f"{orig_width}x{orig_height}",
            'modelParameters': perf['modelParameters'],
            'flops': perf['flops'],
            'numLayers': perf['numLayers'],
            'activationMapUrls': activation_maps  # multiple for classification
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
