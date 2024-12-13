import io
import pandas as pd
from PIL import Image
from flask import Flask, render_template, request, send_file
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
import plotly.express as px
import base64

from main import loss_plot, history, acc_plot

app = Flask(__name__)

# Load your model
model = tf.keras.models.load_model('nebulae_v_galaxies.h5')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    global uploaded_image_data
    if 'file' not in request.files or request.files['file'].filename == '':
        return render_template('index.html', uploaded_image=None, prediction="No file selected")

    try:
        file = request.files['file']
        img = Image.open(file.stream)
        img = img.resize((150, 150))

        # Save the uploaded image to memory
        img_buffer = BytesIO()
        img.save(img_buffer, format="PNG")
        img_buffer.seek(0)
        uploaded_image_data = img_buffer.read()

        # Encode the image for display
        img_base64 = base64.b64encode(uploaded_image_data).decode('utf-8')

        return render_template('index.html', uploaded_image=img_base64, prediction=None)
    except Exception as e:
        return render_template('index.html', uploaded_image=None, prediction=f"Error: {str(e)}")


@app.route('/predict', methods=['POST'])
def predict():
    global uploaded_image_data
    if not uploaded_image_data:
        return render_template('index.html', uploaded_image=None, prediction="No image uploaded")

    try:
        img = Image.open(BytesIO(uploaded_image_data))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)

        # Get the class with the highest probability (for binary classification)
        predicted_class = np.argmax(prediction)
        predicted_class = 'Galaxy' if predicted_class == 0 else 'Nebula'
        probability = np.max(prediction)

        # Encode the image for display
        img_base64 = base64.b64encode(uploaded_image_data).decode('utf-8')

        return render_template('index.html', uploaded_image=img_base64, prediction=f"Predicted class: {predicted_class} with probability: {probability:.2f}")
    except Exception as e:
        return render_template('index.html', uploaded_image=None, prediction=f"Error during prediction: {str(e)}")

@app.route('/documentation')
def documentation():
    return render_template('documentation.html')

if __name__ == '__main__':
    app.run(debug=True)
