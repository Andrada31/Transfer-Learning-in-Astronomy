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
import torch

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)
Compress(app)

# Model paths
MODEL_PATHS = {
    'vgg': '../models/saved/vgg16-v2.keras',
    'resnet': '../models/saved/resnet50.keras',
    'efficientnet': '../models/saved/efficientnet-v4.keras'
}
YOLO_MODEL_PATH = '../models/saved/yolo11n-20ep.pt'

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

def compute_activation_map(model_name, model, img_array, predicted_class_index):
    try:
        if model_name == "efficientnet":
            submodel = model.get_layer("efficientnetb0")
            conv_layer = submodel.get_layer("top_conv")
        elif model_name == "vgg":
            conv_layer = model.get_layer("block5_conv3")
        elif model_name == "resnet":
            conv_layer = model.get_layer("conv5_block3_out")
        else:
            return ""

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
        return f"data:image/png;base64,{activation_map_data}"

    except Exception as e:
        print(f"Grad-CAM error for {model_name}: {e}")
        return ""

# def predict_with_yolo(image):
#     global yolo_model
#     if yolo_model is None:
#         print("Loading YOLO model...")
#         yolo_model = torch.hub.load('ultralytics/yolov5', 'custom', path=YOLO_MODEL_PATH, force_reload=False)
#
#     img_bytes = BytesIO()
#     image.save(img_bytes, format='JPEG')
#     img_bytes.seek(0)
#
#     start_time = time.time()
#     results = yolo_model(img_bytes)
#     inference_time = (time.time() - start_time) * 1000
#     detections = results.pandas().xyxy[0].to_dict(orient="records")
#
#     return detections, inference_time

def predict_with_yolo(image):
    global yolo_model
    if yolo_model is None:
        print("Loading YOLOv11n model with Ultralytics...")
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
                detections.append({
                    'class': yolo_model.names[cls_id],
                    'confidence': conf
                })

    return detections, inference_time



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
            detections, inference_time = predict_with_yolo(img)
            return jsonify({
                'model_name': 'yolo',
                'input_size': f"{orig_width}x{orig_height}",
                'inference_time': inference_time,
                'detections': detections
            })

        img_array = preprocess_image(img)
        model = get_model(model_name)
        start_time = time.time()
        prediction = model.predict(img_array)[0]
        inference_time = (time.time() - start_time) * 1000
        predicted_class_index = np.argmax(prediction)
        perf = MODEL_PERFORMANCE[model_name]

        response_data = {
            'class': class_names[predicted_class_index],
            'probability': float(np.max(prediction)),
            'inference_time': inference_time,
            'model_name': model_name,
            'input_size': f"{orig_width}x{orig_height}",
            'modelParameters': perf['modelParameters'],
            'flops': perf['flops'],
            'numLayers': perf['numLayers'],
        }

        activation_map_url = compute_activation_map(model_name, model, img_array, predicted_class_index)
        response_data['activationMapUrl'] = activation_map_url

        return jsonify(response_data)


    except Exception as e:

        print("YOLO Prediction Error:")

        traceback.print_exc()  # print full traceback

        return jsonify({'error': str(e)}), 500

@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)