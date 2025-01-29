from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)  # Enable CORS for specific origin

# Load your model
model = tf.keras.models.load_model('../models/saved/nebulae_v_galaxies.h5')

@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files or request.files['file'].filename == '':
        return jsonify({'error': 'No file selected'}), 400

    file = request.files['file']
    img = Image.open(file.stream)
    img = img.resize((150, 150))
    img_buffer = BytesIO()
    img.save(img_buffer, format="PNG")
    img_buffer.seek(0)
    uploaded_image_data = img_buffer.read()

    # Encode the image for frontend preview
    img_base64 = base64.b64encode(uploaded_image_data).decode('utf-8')
    return jsonify({'image': f'data:image/png;base64,{img_base64}'})

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({'error': 'No image data provided'}), 400

    try:
        # Decode and preprocess the image
        image_data = base64.b64decode(data['image'].split(',')[1])
        img = Image.open(BytesIO(image_data))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Perform prediction
        prediction = model.predict(img_array)
        predicted_class = 'Galaxy' if np.argmax(prediction) == 0 else 'Nebula'
        probability = np.max(prediction)

        return jsonify({'class': predicted_class, 'probability': f'{probability:.2f}'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/documentation', methods=['GET'])
def documentation():
    # Return some documentation details
    return jsonify({
        'title': 'Deep Space Objects Classification Tool',
        'description': 'Classify deep space objects into galaxies or nebulae using AI.'
    })

# Serve React app
@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)