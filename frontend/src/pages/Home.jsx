// src/pages/Home.jsx
import React, { useState } from 'react';
import '@/styles/App.css';
import { Button } from "@/components/ui/button";
import SolarSystem from "@/components/custom/SolarSystem";
import Sidenavbar from "@/components/custom/sidenavbar";
import Tooltip from "@/components/custom/Tooltip";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import { FaTerminal as Terminal } from "react-icons/fa6";
import {ImageUploadPredict} from "@/components/custom/ImageUploadPredict";
import ModelSelector from "@/components/custom/ModelSelector";


const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [activeTab, setActiveTab] = useState('resnet');
    const [predictionError, setPredictionError] = useState(null);

    const handleModelChange = (tab) => {
        setActiveTab(tab);
    };

    return (
    <div className="flex flex-col">
        <Sidenavbar/>
        <div className="p-7">
            <SolarSystem/>
            <Alert>
                <Terminal className="h-4 w-4"/>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You can upload an image and predict its class using the model selector below.
                </AlertDescription>
            </Alert>
            <h1>DSO CLASSIFICATION TOOL</h1>
           <ModelSelector onModelChange={handleModelChange} />
            <ImageUploadPredict
              selectedModel={activeTab}
              onPrediction={(result) => setPrediction(result)}
              onError={(err) => setPredictionError(err)}
            />

        </div>
        <div className="hidden md:block">
            <Tooltip/>
        </div>
    </div>
    )
        ;
};

export default Home;
