import React, { useState } from "react";

const ModelSelector = ({ onModelChange }) => {
  const [activeTab, setActiveTab] = useState("resnet");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onModelChange) {
      onModelChange(tab);
    }
  };

  return (
    <nav className="w-full bg-[#292a43] flex justify-between items-center py-2.5 px-5 top-0 left-0 z-50 rounded-xl">
      <div className="text-lg text-white">Model Selector</div>
      <div className="tabs flex flex-wrap gap-4">
        {["resnet", "efficientnet", "vgg"].map((model) => (
          <a
            key={model}
            href={`#${model}`}
            className={`px-4 py-2 rounded-md cursor-pointer ${activeTab === model ? "bg-white !text-gray-900" : "text-gray-300"}`}
            onClick={() => handleTabClick(model)}
          >
            {model.charAt(0).toUpperCase() + model.slice(1)}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default ModelSelector;
