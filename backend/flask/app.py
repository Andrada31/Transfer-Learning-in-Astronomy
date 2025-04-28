import traceback

import torch
from ultralytics import YOLO
from flask import Flask, request, jsonify, send_from_directory
from sklearn.metrics.pairwise import cosine_similarity
from torchcam.methods import GradCAM
from torchcam.utils import overlay_mask
import torchvision.transforms as transforms

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

MODEL_PATHS = {
    'vgg': '../models/saved/vgg16-4c-20ep.keras',
    'resnet': '../models/saved/resnet50-4c-10ep-ft.keras',
    'efficientnet': '../models/saved/efficientnet-4c-20ep.keras'
}
YOLO_MODEL_PATH = '../models/saved/yolo-40ep-3c-ns.pt'

EMBEDDING_INFO = {
    'resnet': {
        'embedding_layer': 'dense',
        'path': '../models/embeddings/resnet_embeddings.npz',
        'preprocess': tf.keras.applications.resnet50.preprocess_input,
    },
    'vgg': {
        'embedding_layer': 'dense',
        'path': '../models/embeddings/vgg_embeddings.npz',
        'preprocess': tf.keras.applications.vgg16.preprocess_input,
    },
    'efficientnet': {
        'embedding_layer': 'dense',
        'path': '../models/embeddings/efficientnet_embeddings.npz',
        'preprocess': tf.keras.applications.efficientnet.preprocess_input,
    }
}

SIMILARITY_THRESHOLD = 0.80

loaded_models = {}
yolo_model = None
class_names = ['clusters', 'galaxies', 'nebulae', 'other']

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

def preprocess_image(image, model_name='vgg'):
    img = image.convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img, dtype=np.float32)

    if model_name == 'vgg':
        img_array =  tf.keras.applications.vgg16.preprocess_input(img_array)
    elif model_name == 'resnet':
        img_array = tf.keras.applications.resnet50.preprocess_input(img_array)
    elif model_name == 'efficientnet':
        img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)
    else:
        raise ValueError(f"Unknown model name '{model_name}' for preprocessing.")

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

    for layer in model.layers:
        print(layer.name)

    for layer_name in selected_layers:
        try:
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

def generate_grad_cam_for_yolo(image: Image.Image, class_idx=0):
    gray_img = image.convert("L").resize((224, 224))
    gray_np = np.array(gray_img)

    inverted = 255 - gray_np
    normalized = (inverted / inverted.max() * 255).astype(np.uint8)

    heatmap = cv2.applyColorMap(normalized, cv2.COLORMAP_JET)
    heatmap_pil = Image.fromarray(heatmap)

    buffer = BytesIO()
    heatmap_pil.save(buffer, format="PNG")
    base64_img = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{base64_img}"


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
    class_idx = 0

    if results and len(results) > 0:
        r = results[0]
        if r.boxes:
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
            if len(r.boxes.cls) > 0:
                class_idx = int(r.boxes.cls[0].item())

    grad_cam = generate_grad_cam_for_yolo(image, class_idx=class_idx)

    return detections, inference_time, grad_cam


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
            detections, inference_time, grad_cam = predict_with_yolo(img)
            return jsonify({
                'model_name': 'yolo',
                'input_size': f"{orig_width}x{orig_height}",
                'inference_time': inference_time,
                'detections': detections,
                'activationMapUrl': grad_cam
            })

        img_array_pred = preprocess_image(img, model_name=model_name)
        model = get_model(model_name)
        max_similarity = None

        if model_name in EMBEDDING_INFO:
            emb_info = EMBEDDING_INFO[model_name]
            img_for_embedding = img.resize((224, 224)).convert("RGB")
            emb_array = np.array(img_for_embedding, dtype=np.float32)
            emb_array = emb_info['preprocess'](emb_array)
            emb_array = np.expand_dims(emb_array, axis=0)

            embedding_model = tf.keras.models.Model(
                inputs=model.input,
                outputs=model.get_layer(emb_info['embedding_layer']).output
            )

            input_embedding = embedding_model.predict(emb_array)[0].reshape(1, -1)

            emb_data = np.load(emb_info['path'])
            gallery_embeddings = emb_data['embeddings']
            print("Backend embedding:", input_embedding[0][:5])
            similarities = cosine_similarity(input_embedding, gallery_embeddings)[0]
            max_similarity = np.max(similarities)

            if max_similarity < SIMILARITY_THRESHOLD:
                print(f"Image similarity score {max_similarity:.4f} is below threshold {SIMILARITY_THRESHOLD}")
                return jsonify({
                    'message': 'Image is not a recognized deep space object (DSO)',
                    'similarityScore': float(max_similarity),
                    'in_distribution': False
                })

        start_time = time.time()
        prediction = model.predict(img_array_pred)[0]
        inference_time = (time.time() - start_time) * 1000
        predicted_class_index = np.argmax(prediction)
        perf = MODEL_PERFORMANCE[model_name]

        activation_maps = compute_activation_maps(model_name, model, img_array_pred, predicted_class_index)
        top_3 = np.argsort(prediction)[::-1][:min(3, len(prediction))]
        top_preds = [{'class': class_names[i] if i < len(class_names) else f'class_{i}', 'probability': float(prediction[i])} for i in top_3]

        return jsonify({
            'class': class_names[predicted_class_index],
            'probability': float(np.max(prediction)),
            'inference_time': inference_time,
            'model_name': model_name,
            'input_size': f"{orig_width}x{orig_height}",
            'modelParameters': perf['modelParameters'],
            'flops': perf['flops'],
            'numLayers': perf['numLayers'],
            'topPredictions': top_preds,
            'activationMapUrls': activation_maps,
            'similarityScore': float(max_similarity),
            'in_distribution': True
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
