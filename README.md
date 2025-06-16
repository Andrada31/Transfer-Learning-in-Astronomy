# Deep Space Objects Classification and Detection Web Tool

My thesis explores how **Transfer Learning** can help in the training of pretrained CNN models (**VGG16, ResNet50, EfficientNet**) for classification, and YOLO object detection algorithms (**YOLOv8-c and YOLOv11n**) to classify and detect the three categories of DSOs
- **Classification**: Categorizes DSOs into three types.
- **Detection**: Detects and classifies multiple DSOs to their specific typology in telescope images.


## Features

The web interface allows users to:
- Upload test images and run **live inference**.
- **Switch between the models** to see the difference in their performance.
- See the how detection models trained on **different datasets** perform on test images (preferabily telescope-like views).
- Visualize **activation maps** for classification using Grad-CAM.
- See model details in individual pages for **comparison**.
- Access the training notebooks and see the results in a more dynamic way.
  

## Technologies

**Languages:** Python, JavaScript, HTML/CSS (Tailwind)  
**Libraries:** NumPy, Matplotlib, OpenCV, Pandas, Seaborn, Plotly, Scikit-learn  
**Frameworks:** TensorFlow, Keras, PyTorch, Ultralytics (YOLO), Flask, React, Vite  


## Training Notebooks

**Classification**  
- [VGG16](https://colab.research.google.com/drive/1JhN31vFhbX7yZKAzIjW6Ll_-CKVLuaJN?usp=sharing)  
- [EfficientNet-B0](https://colab.research.google.com/drive/1QPgiamn--HrZYts9vc0mm6dops6s4U2n?usp=sharing)  
- [ResNet50](https://colab.research.google.com/drive/1kfun5ulki8t3s-sRT4EjR8_XYxEbp5p8?usp=sharing)

**Detection**  
- [YOLOv11n](https://www.kaggle.com/code/andradaparaczki/yolo11n)  
- [YOLOv8](https://www.kaggle.com/code/andradaparaczki/yolov8)


## Datasets

- [Balanced DSYD (detection)](https://kaggle.com/datasets/46b6bd726580e1ced264c2b6ee9a8605d192d4cbf4984a2e3d9cd6882d28e204)  
- [DeepSky3-HEN (classification)](https://kaggle.com/datasets/a2cb6615c3d14d29d4b87ff121a52aa7140b7674901aaffd0832cc2d8eb04b34)


## Project Setup

> **Important:** Due to large file size, the trained models are not included in this repository.  
> Download them from this Drive folder and place them in `backend/models/saved/`:

**[Download Models – Google Drive](https://drive.google.com/drive/folders/1-ej5x-bYREaf6SJZv2JmXCB6z3UgybRO?usp=sharing)**


### 1. Clone the repository

```bash
git clone https://gitlab.dev.info.uvt.ro/didactic/2025/licenta/ie/licentaandrada-mihaelaparaczki2025.git
cd licentaandrada-mihaelaparaczki2025/proiect
```

### 2. Create the python venv
```bash
python -m venv .venv
.venv\Scripts\activate
```

### 3. Install python libs
```bash
pip install -r requirements.txt
```
### 4. Install root dependencies for testing
```bash
npm install
```
### 5. Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```
### 6. Start the application 
```bash
npm start
```
### 7. (Optional) Run API tests
```bash
npm test
```

