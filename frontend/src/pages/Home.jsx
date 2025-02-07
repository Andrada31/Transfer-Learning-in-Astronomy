// src/pages/Home.jsx
import React, { useState } from 'react';
import { uploadImage, predictImage } from '@/services/api';
import '../assets/styles/App.css';
import { Button } from "@/components/ui/button";
import SolarSystem from "@/components/custom/SolarSystem";
import Sidenavbar from "@/components/custom/sidenavbar";
import Tooltip from "@/components/custom/Tooltip";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import { FaTerminal as Terminal } from "react-icons/fa6";
import ImageUpload from "@/components/custom/ImageUpload";


const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [activeTab, setActiveTab] = useState('resnet');

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

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
    <div>
        <div className="sidenavbar-container">
            <Sidenavbar/>
        </div>
        <div className="content-container">
            <SolarSystem/>
            <nav>
                <div className="title">Model Selector</div>
                <div className="tabs">
                    <a
                        href="#resnet"
                        className={activeTab === 'resnet' ? 'active' : ''}
                        onClick={() => handleTabClick('resnet')}
                    >
                        ResNet
                    </a>
                    <a
                        href="#efficientnet"
                        className={activeTab === 'efficientnet' ? 'active' : ''}
                        onClick={() => handleTabClick('efficientnet')}
                    >
                        EfficientNet
                    </a>
                    <a
                        href="#vgg"
                        className={activeTab === 'vgg' ? 'active' : ''}
                        onClick={() => handleTabClick('vgg')}
                    >
                        VGG
                    </a>
                </div>
            </nav>

            <h1>DSO CLASSIFICATION TOOL</h1>
            {/*<RadioButton/>*/}
            <Alert>
                <Terminal className="h-4 w-4"/>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You can upload an image and predict its class using the model selector above.
                </AlertDescription>
            </Alert>
            <label htmlFor="file-upload" className="custom-file-upload">
                Upload Image
            </label>
            <input id="file-upload" type="file" onChange={handleUpload}/>
            <Button onClick={handlePredict}>Predict</Button>
            {selectedImage && <img src={selectedImage} alt="Uploaded"/>}
            {prediction && (
                <h2>
                    Predicted Class: {prediction.class} with Probability: {prediction.probability}
                </h2>
            )}
            {/*<ImageUpload/>*/}
        </div>
        <Tooltip/>
    </div>
    )
        ;
};

export default Home;
