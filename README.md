# 🌌Deep Space Objects Classification Tool

This project aims to provide an automated way to differentiate between two classes of Deep Space Objects (DSO): galaxies, nebulae and star clusters. Using a custom Convolutional Neural Network (CNN) architecture build on pretrained models, my model is trained to classify images of these objects with high accuracy.

## Project Overview

The project explores deep learning to analyze and classify images of deep space objects. Through Transfer Learning on [VGG16](https://arxiv.org/abs/1409.1556), [ResNet50](https://arxiv.org/abs/1512.03385) and [EfficientNet](https://arxiv.org/abs/1905.11946), the model is able to learn and identify intricate patterns within the images dataset. The user can make classifications of galaxies, nebulae and star clusters, while seeing the performance of the models and being able to give a feedback regarding its accuracy. This approach not only automates the classification process but also provides a scalable solution for analyzing large datasets of astronomical images.

In addition to the AI model, the project includes a web application built with Flask. This web app allows users to upload images of deep space objects and receive real-time predictions from the trained model. The user-friendly interface ensures that even those with limited technical knowledge can easily interact with the system and obtain accurate classifications.

## Technologies Used
______________________
### Programming Language
- **Python**
- **Libraries**: NumPy, Matplotlib

### Deep Learning Frameworks
- **Google Colab** workspace for available hardware resources 
- **TensorFlow**
- **Keras**
  - High-level neural networks API
  - Simplified model development
  - Easy model configuration

### Pretrained Models in Google Colab
- ResNet
- EfficientNet
- VGG

### Image Processing
- Image normalization and applied bw filter for comparison
- Data augmentation techniques
  - Letterboxing and cropping
 
### Web Application
- **Flask**: Model deployment framework
- **React + Vite**: frontend and UI/UX 
  - includes data analysis page
  - showcases each model usage
  - explores the classification tool


## Features
_______________
- **Deep Learning Models**: Users can toggle between VGG, ResNet, and EfficientNet for classification.
- **Web-Based Interface**: React interactive UI for easy exploration.
- **REST API**: Flask backend for model inference and data handling.



## Project Setup
_________________

### Prerequisites
```bash
Python 3.8+
TensorFlow
Keras
Flask
NumPy
Matplotlib
React.js
Vite
```

## Future Improvements
- Toggle between different wavelength spectra for image classification
- Model performance optimization
- Dataset expansion
