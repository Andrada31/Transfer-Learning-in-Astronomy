import React, { useState, useEffect } from "react";

const ModelSelector = ({ mode = "classification", onModelChange }) => {
  const classificationModels = {
    resnet: "ResNet-50",
    efficientnet: "EfficientNetB0",
    vgg: "VGG16",
  };

  const detectionModels = {
    yolo11: "YOLOv11n",
    yolo8: "YOLOv8",
  };

  const modelLabels = mode === "detection" ? detectionModels : classificationModels;
  const defaultModelKey = Object.keys(modelLabels)[0];

  const [activeTab, setActiveTab] = useState(defaultModelKey);

  useEffect(() => {
    // Reset the tab when mode changes
    setActiveTab(defaultModelKey);
    onModelChange?.(defaultModelKey);
  }, [mode]); // ← triggers only when mode changes

  const handleTabClick = (model) => {
    setActiveTab(model);
    onModelChange?.(model);
  };

  return (
      <nav className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:w-[40vw] bg-indigo-500/20 flex justify-between items-center py-2.5 px-5 top-0 left-0 z-50 rounded-xl">
        <div className="text-lg text-white">Model Selector</div>
        <div className="tabs flex flex-wrap gap-4">
          {Object.keys(modelLabels).map((model) => (
              <a
                  key={model}
                  href={`#${model}`}
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                      activeTab === model ? "bg-white !text-gray-900" : "text-gray-300"
                  }`}
                  onClick={() => handleTabClick(model)}
              >
                {modelLabels[model]}
              </a>
          ))}
        </div>
      </nav>
  );
};

export default ModelSelector;
