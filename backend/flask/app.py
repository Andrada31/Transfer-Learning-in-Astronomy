from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
import base64
from flask_compress import Compress
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)
Compress(app)

# Path map for saved models
MODEL_PATHS = {
    'vgg': '../models/saved/vgg16.keras',
    'resnet': '../models/saved/resnet.keras',  # Not yet available
    'efficientnet': '../models/saved/efficientnet.keras'  # Not yet available
}

# Loaded models cache
loaded_models = {}

# Class names used by all models
class_names = ['clusters', 'galaxies', 'nebulae']

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
        raise FileNotFoundError(f"Model '{model_name}' is not available yet.")
    if model_name not in loaded_models:
        loaded_models[model_name] = tf.keras.models.load_model(MODEL_PATHS[model_name])
    return loaded_models[model_name]

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
    print("Received request:", data)  # Debugging line

    if not data or 'image' not in data or 'model' not in data:
        return jsonify({'error': 'Missing image or model'}), 400

    try:
        model_name = data['model']
        print(f"Model selected: {model_name}")  # Debugging line

        image_data = base64.b64decode(data['image'].split(',')[1])
        img = Image.open(BytesIO(image_data))
        img_array = preprocess_image(img)

        model = get_model(model_name)
        prediction = model.predict(img_array)[0]

        top_indices = prediction.argsort()[::-1][:3]
        top_predictions = [
            {
                'class': class_names[i],
                'probability': float(prediction[i])
            } for i in top_indices
        ]

        return jsonify({
            'class': class_names[np.argmax(prediction)],
            'probability': float(np.max(prediction)),
            'top_predictions': top_predictions
        })
    except Exception as e:
        print("Prediction Error:", str(e))  # Debugging line
        return jsonify({'error': str(e)}), 500


@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
