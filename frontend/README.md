# 🌌Deep Space Objects Classification Tool

This project aims to provide an automated way to differentiate between two classes of Deep Space Objects (DSO): galaxies, nebulae and star clusters. Using a custom Convolutional Neural Network (CNN) architecture build on pretrained models (VGG, ResNet and EfficientNet), the model is trained to classify images of these objects with high accuracy.

## Project Overview

The project explores deep learning to analyze and classify images of deep space objects. Through Transfer Learning on VGG16, ResNet50 and EfficientNet, the model is able to learn and identify intricate patterns within the images dataset. The user can make classifications of galaxies, nebulae and star clusters, while seeing the performance of the models and being able to give a feedback regarding its accuracy. This approach not only automates the classification process but also provides a scalable solution for analyzing large datasets of astronomical images.

In addition to the AI model, the project includes a web application built with Flask. This web app allows users to upload images of deep space objects and receive real-time predictions from the trained model. The user-friendly interface ensures that even those with limited technical knowledge can easily interact with the system and obtain accurate classifications.

## Technologies Used

- **Python**: The primary programming language used for developing the AI model and backend.
- **Flask**: A lightweight web framework used to build the web application.
- **TensorFlow and Keras**: Libraries used for building and training the deep learning model.
- **HTML and CSS**: Used for creating the web application's interface.
- **React**: Used for building the frontend of the web application.

## Features
- **Deep Learning Models**: Users can toggle between VGG, ResNet, and EfficientNet for classification.
- **Web-Based Interface**: React interactive UI for easy exploration.
- **REST API**: Flask backend for model inference and data handling.


