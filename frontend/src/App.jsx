import React, { useState } from 'react';
import { uploadImage, predictImage } from './services/api.js';
import './assets/styles/App.css';


const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const response = await uploadImage(file);
      setSelectedImage(response.data.image);
    }
  };

  const handlePredict = async () => {
    if (selectedImage) {
      const response = await predictImage(selectedImage);
      setPrediction(response.data);
    }
  };

  return (
    <div>
      <nav>
        <div className="title">Model Selector</div>
        <div className="tabs">
          <a href="#resnet">ResNet</a>
          <a href="#efficientnet">EfficientNet</a>
          <a href="#vgg">VGG</a>
        </div>
      </nav>
      <h1>DSO CLASSIFICATION TOOL</h1>
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload Image
      </label>
      <input id="file-upload" type="file" onChange={handleUpload} />
      <button onClick={handlePredict} disabled={!selectedImage}>
        Predict
      </button>
      {selectedImage && <img src={selectedImage} alt="Uploaded" />}
      {prediction && (
        <h2>
          Predicted Class: {prediction.class} with Probability: {prediction.probability}
        </h2>
      )}
    </div>
  );
};

export default Home;