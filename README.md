# 🌌 Deep Space Objects Classification Tool  

This project aims to provide an automated way to differentiate between **three** classes of Deep Space Objects (DSO): **galaxies, nebulae, and star clusters**. Using a **custom Convolutional Neural Network (CNN) architecture** built on **pretrained models**, the model is trained to classify images of these objects with high accuracy.  

## Project Overview  

The project explores **deep learning** to analyze and classify images of deep space objects. Through **Transfer Learning** on **VGG16, ResNet50, and EfficientNet**, the model learns to identify intricate patterns within the dataset.  

- Users can classify **galaxies, nebulae, and star clusters** while comparing the performance of different models.  
- The web application provides an interface to interact with the models and allows users to provide **feedback** on classification accuracy.  
- This approach **automates** the classification process and provides a **scalable solution** for analyzing large astronomical image datasets.  

### Web Application  
In addition to the AI model, the project includes a **Flask-based web application** that allows users to:  
- **Upload** images of deep space objects.
- Receive **real-time** predictions from the trained model.
- Explore **model performance and classification results** through an intuitive UI.  

## Technologies Used  

### **Programming Language**  
- **Python**: Used for training deep learning models in Google Colab and implementing the Flask backend.
- **JavaScript**: Used for building the frontend with Vite + React.
- **HTML & CSS with Tailwind**: Used for styling and structuring the web interface.

### **Libraries**  
- NumPy  
- Matplotlib  

### **Deep Learning Frameworks**  
- **Google Colab** (for available hardware resources)  
- **TensorFlow**  
- **Keras**  
  - High-level neural networks API  
  - Simplified model development  
  - Easy model configuration  

### **Pretrained Models in Google Colab**  
- **[VGG](https://arxiv.org/abs/1409.1556)**  
- **[ResNet](https://arxiv.org/abs/1512.03385)**  
- **[EfficientNet](https://arxiv.org/abs/1905.11946)**  

### **Image Processing**  
- Image normalization and applied **black & white filter** for comparison  
- Data augmentation techniques  
- **Letterboxing** and **cropping**  

### **Web Application**  
- **Flask** - Model deployment framework  
- **React** + **Vite** for frontend & UI/UX  
  - **Includes a data analysis page**  
  - **Showcases each model's classification results**  
  - **Explores the classification tool**  

## Features  

- **Deep Learning Models**: Users can toggle between **VGG16, ResNet50, and EfficientNet** for classification.  
- **Web-Based Interface**: A **React-powered UI** for easy exploration.  
- **REST API**: Flask backend for **model inference** and **data handling**.  

## Project Setup  

### **Prerequisites**  
Ensure you have the following installed:  

- **Python 3.8+**  
- **TensorFlow**  
- **Keras**  
- **Flask**  
- **NumPy**  
- **Matplotlib**  
- **React.js**  
- **Vite**  

## Future Improvements  

- **Toggle between different wavelength spectra for image classification**  
- **Optimize model performance**  
- **Expand the dataset**  

