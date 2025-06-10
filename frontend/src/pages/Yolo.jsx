import React from 'react';
import '@/styles/App.css';
import { ProgressBar } from "@/components/custom/ProgressBar";
import ModelDetails from "@/components/custom/ModelDetails";
import DatasetDetection from "@/components/custom/DatasetDetection";
import YoloMetricsDashboard from "@/components/charts/YOLOMetricsChart";

const sections = [
  { id: "model", title: "Model" },
  { id: "dataset", title: "Dataset" },
  { id: "results", title: "Results" },
];

const Yolo = () => {
  return (
    <div className="relative w-full flex justify-center">
      <div className="flex flex-col w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[67vw] lg:w-[65vw] lg:pl-40 pt-5">
        <div id="model" className="fade-in">
          <ModelDetails defaultModel="yolo11" />
        </div>
        <div id="dataset" className="fade-in">
          <DatasetDetection />
        </div>
        <div id="results" className="fade-in">
          <YoloMetricsDashboard />
        </div>
      </div>

      <div className="relative right-[-12vw] z-40">
        <ProgressBar sections={sections} />
      </div>
    </div>
  );
};

export default Yolo;
