from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
import base64
from flask_compress import Compress
import os
import time
import cv2

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)
Compress(app)

MODEL_PATHS = {
    'vgg': '../models/saved/vgg16-v2.keras',
    'resnet': '../models/saved/resnet50.keras',
    'efficientnet': '../models/saved/efficientnetB0.keras'
}

loaded_models = {}
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


def compute_activation_map(model, img_array, predicted_class_index):
    try:
        preds = model.predict(img_array)
        nested_vgg = model.layers[0]
        if not isinstance(nested_vgg, tf.keras.Model):
            print("First layer is not a nested functional model. Can't compute Grad-CAM.")
            return ""

        conv_layer = nested_vgg.get_layer('block5_conv3')
        grad_model = tf.keras.Model(inputs=nested_vgg.inputs,
                                    outputs=[conv_layer.output, model.output])

        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_array)
            loss = predictions[:, predicted_class_index]

        grads = tape.gradient(loss, conv_outputs)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

        conv_outputs = conv_outputs[0]
        conv_outputs = conv_outputs * pooled_grads
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
        print("Grad-CAM error:", e)
        return ""


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
    print("Received request:", data)

    if not data or 'image' not in data or 'model' not in data:
        return jsonify({'error': 'Missing image or model'}), 400

    try:
        model_name = data['model']
        print(f"Model selected: {model_name}")

        start_time = time.time()

        image_data = base64.b64decode(data['image'].split(',')[1])
        img = Image.open(BytesIO(image_data))
        img_array = preprocess_image(img)

        model = get_model(model_name)
        print("Top-level model layers:", [layer.name for layer in model.layers])

        if isinstance(model.layers[0], tf.keras.Model):
            print("Nested model detected:", model.layers[0].name)
            print("Nested model layers:", [layer.name for layer in model.layers[0].layers])
        else:
            print("No nested model detected.")

        prediction = model.predict(img_array)[0]
        inference_time = (time.time() - start_time) * 1000

        top_indices = prediction.argsort()[::-1][:3]
        top_predictions = [
            {
                'class': class_names[i],
                'probability': float(prediction[i])
            }
            for i in top_indices
        ]

        predicted_class_index = np.argmax(prediction)
        activation_map_url = ""
        if model_name == "vgg":
            activation_map_url = compute_activation_map(model, img_array, predicted_class_index)
        perf = MODEL_PERFORMANCE[model_name]

        response_data = {
            'class': class_names[predicted_class_index],
            'probability': float(np.max(prediction)),
            'top_predictions': top_predictions,
            'activationMapUrl': activation_map_url,
            'inference_time': inference_time,
            'model_name': model_name,
            'input_size': "224x224",
            'dataset_origin': "Custom Dataset",
            'modelParameters': perf['modelParameters'],
            'flops': perf['flops'],
            'numLayers': perf['numLayers']
        }
        return jsonify(response_data)

    except Exception as e:
        print("Prediction Error:", str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
