import React from 'react';
import '@/styles/App.css';
import { ProgressBar } from "@/components/custom/ProgressBar";
import ModelDetails from "@/components/custom/ModelDetails";
import { ClassificationMetrics } from "@/components/charts/ClassificationMetrics";
import DatasetClassification from "@/components/custom/DatasetClassification";

const sections = [
  { id: "model", title: "Model" },
  { id: "dataset", title: "Dataset" },
  { id: "results", title: "Results" }
];

const ResNet = () => {
  return (
    <div className="relative w-full flex justify-center">
      <div className="flex flex-col w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[67vw] lg:w-[46vw] overflow-x-hidden pt-5">
        <div id="model" className="fade-in">
          <ModelDetails defaultModel="resnet50" />
        </div>
        <div id="dataset" className="fade-in">
          <DatasetClassification />
        </div>
        <div id="results" className="mt-[80px]">
          <ClassificationMetrics modelName="resnet50" />
        </div>

      </div>

      <div className="relative right-[-23vw] z-40">
        <ProgressBar sections={sections} />
      </div>
    </div>
  );
};

export default ResNet;
