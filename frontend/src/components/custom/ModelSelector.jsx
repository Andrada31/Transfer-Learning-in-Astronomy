import React, { useState } from "react";

const ModelSelector = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [activeTab, setActiveTab] = useState("resnet");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <nav className="w-full bg-[#292a43] flex justify-between items-center py-2.5 px-5 top-0 left-0 z-50 rounded-xl">
            <div className="text-lg text-white">Model Selector</div>
            <div className="tabs flex flex-wrap gap-4">
                <a
                    href="#resnet"
                    className={`px-4 py-2 rounded-md cursor-pointer ${activeTab === 'resnet' ? 'bg-white !text-gray-900' : 'text-gray-300'}`}
                    onClick={() => handleTabClick('resnet')}
                >
                    ResNet
                </a>
                <a
                    href="#efficientnet"
                    className={`px-4 py-2 rounded-md cursor-pointer ${activeTab === 'efficientnet' ? 'bg-white !text-gray-900' : 'text-gray-300'}`}
                    onClick={() => handleTabClick('efficientnet')}
                >
                    EfficientNet
                </a>
                <a
                    href="#vgg"
                    className={`px-4 py-2 rounded-md cursor-pointer ${activeTab === 'vgg' ? 'bg-white !text-gray-900' : 'text-gray-300'}`}
                    onClick={() => handleTabClick('vgg')}
                >
                    VGG
                </a>
            </div>
        </nav>
    );
};

export default ModelSelector;
