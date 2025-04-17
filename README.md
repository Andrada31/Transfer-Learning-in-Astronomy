# 🌌 Deep Space Objects Classification and Detection Tool  

This project provides an automated approach to identify and analyze **Deep Space Objects (DSOs)** through two main functionalities: **classification** and **detection**. It uses state of the art Convolutional Neural Networks (CNN) and YOLO detection models to classify and detect three categories of DSOs: **galaxies, nebulae, and star clusters**.  

## Project Overview  

The project explores **deep learning** techniques using **Transfer Learning** on pretrained CNN models (**VGG16, ResNet50, EfficientNet**) for classification, and modern object detection algorithms (**YOLOv9 and YOLOv11n**) to locate and identify DSOs within images.

- **Classification**: Classify DSOs into galaxies, nebulae, or star clusters while comparing model performance.
- **Detection**: Identification and localization of multiple DSOs within an image.
- Web application for vizualization and model performance demo.

### Web Application  

The project includes a **Flask-based web application** that allows users to:
- **Upload images** for classification and detection.
- Receive **classification predictions and detection results**.
- Vizualize the **actiavtion map** for multiple convolutional layers of the selected model
- Explore **model performance and visual detection outcomes** through the interface.

## Technologies Used  

### **Programming Languages**  
- **Python**: For deep learning model training (via Google Colab), detection algorithms, and Flask backend.
- **JavaScript**: Frontend development with React and Vite.
- **HTML & CSS with Tailwind**: UI/UX design for the web interface.

### **Libraries**  
- NumPy  
- Matplotlib  
- OpenCV (for image processing and detection visualization)

### **Deep Learning Frameworks**  
- **TensorFlow**  
- **Keras**
  - High-level neural networks API  
  - Streamlined model development  
- **Google Colab** (leveraging GPU and TPU resources)

### **Pretrained CNN Models**  
- **[VGG16](https://arxiv.org/abs/1409.1556)**  
- **[ResNet50](https://arxiv.org/abs/1512.03385)**  
- **[EfficientNet](https://arxiv.org/abs/1905.11946)**

### **Object Detection Algorithms**  
- **YOLOv9 and YOLOv11n**
- SVM (to be implemented)
  
### **Image Processing**  
- Image normalization and **black & white filters** for comparison  
- Data augmentation techniques  
  - **Letterboxing** and **cropping**

### **Web Application**  
- **Flask**: Model deployment and backend API  
- **React + Vite**: Frontend UI/UX  
  - Includes a data analysis page  
  - Object detection visualization  
  - Comparative model performance insights
  - Training results and analysis of performance

## Features  

- **Classification Models**: Easily switch between **VGG16, ResNet50, and EfficientNet**.
- **Detection Models**: DSO detection using **YOLOv9 and YOLOv11n**.
- **Interactive Web Interface**: React-based UI facilitating seamless exploration and analysis.
- **REST API**: Robust Flask backend supporting comprehensive data management.

## Project Setup  

### **Prerequisites**  
Ensure you have the following installed:
```plaintext
- Python 3.8+
- TensorFlow  
- Keras  
- Flask  
- NumPy
- Matplotlib  
- OpenCV
- React.js  
- Vite
```

## Future Improvements  

- **Toggle between different wavelength spectra for image classification**  
- **Optimize model performance**  
- **Expand the dataset**  
