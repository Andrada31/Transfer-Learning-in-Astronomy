import React from 'react';
import Tooltip from "@/components/custom/Tooltip";
import ModelDetails from "@/components/custom/ModelDetails";
import DatasetClassification from "@/components/custom/DatasetClassification";
import ClassificationMetrics from "@/components/charts/ClassificationMetrics";
import { ProgressBar } from "@/components/custom/ProgressBar";

const sections = [
  { id: "model", title: "Model" },
  { id: "dataset", title: "Dataset" },
  { id: "results", title: "Results" }
];

const VGG = () => {
  return (
    <div className="relative w-full flex justify-center">
      {/* Main scrollable content */}
      <div className="flex flex-col w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[67vw] lg:w-[65vw] lg:pl-40 overflow-x-hidden pt-5">
        <div id="model" className="fade-in">
          <ModelDetails defaultModel="vgg16" />
        </div>
        <div id="dataset" className="fade-in">
          <DatasetClassification />
        </div>
        <div id="results" className="mt-[80px]">
          <ClassificationMetrics modelName="vgg16" />
        </div>
      </div>

      {/* Floating ProgressBar pinned to the right */}
      <div className="relative right-[-12vw] z-40">
        <ProgressBar sections={sections} />
        {/* <Tooltip /> */}
      </div>
    </div>
  );
};

export default VGG;
