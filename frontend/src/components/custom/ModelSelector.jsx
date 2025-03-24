import React, { useState } from "react";

const ModelSelector = ({ onModelChange }) => {
  const [activeTab, setActiveTab] = useState("resnet");

  // Map from internal identifiers to display labels
  const modelLabels = {
    resnet: "ResNet-50",
    efficientnet: "EfficientNetB0",
    vgg: "VGG16",
  };

  const handleTabClick = (model) => {
    setActiveTab(model);
    if (onModelChange) {
      onModelChange(model);
    }
  };

  return (
    <nav className="w-full bg-indigo-500/20 flex justify-between items-center py-2.5 px-5 top-0 left-0 z-50 rounded-xl">
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
