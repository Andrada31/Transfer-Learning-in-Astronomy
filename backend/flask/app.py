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
    'efficientnet': '../models/saved/efficientnet-v2.keras'
}

loaded_models = {}
class_names = ['clusters', 'galaxies', 'nebulae']

# A helper dict that points each model to the name of the last conv layer
LAST_CONV_LAYER = {
    'vgg': 'block5_conv3',           # as before
    'resnet': 'conv5_block3_out',    # typical final conv block in ResNet50
    'efficientnet': 'top_conv',      # typical final conv in EfficientNetV2
}


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


def compute_activation_map(model_name, model, img_array, predicted_class_index):
    try:
        # If the model is EfficientNet, we grab the nested submodel and last conv
        if model_name == "efficientnet":
            submodel = model.get_layer("efficientnetb0")  # <== your nested submodel name
            conv_layer = submodel.get_layer("top_conv")   # <== adjust if not actually "top_conv"
        elif model_name == "vgg":
            conv_layer = model.get_layer("block5_conv3")
        elif model_name == "resnet":
            conv_layer = model.get_layer("conv5_block3_out")
        else:
            return ""

        # Build a grad_model that returns (conv_activations, predictions)
        grad_model = tf.keras.models.Model(
            inputs=model.inputs,
            outputs=[conv_layer.output, model.output]
        )

        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_array)
            loss = predictions[:, predicted_class_index]

        grads = tape.gradient(loss, conv_outputs)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

        # Multiply each channel by its "importance" to the predicted class
        conv_outputs = conv_outputs[0] * pooled_grads
        heatmap = tf.reduce_sum(conv_outputs, axis=-1)
        heatmap = tf.nn.relu(heatmap)

        # Normalize heatmap to [0, 1]
        heatmap /= tf.reduce_max(heatmap)
        heatmap = heatmap.numpy()

        # Resize, colorize with OpenCV, and convert to base64
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

        # Always compute Grad-CAM (or activation map) for the chosen model
        activation_map_url = compute_activation_map(model_name, model, img_array, predicted_class_index)
        response_data['activationMapUrl'] = activation_map_url


        return jsonify(response_data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
