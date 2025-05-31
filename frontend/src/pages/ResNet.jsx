import React from 'react';
import '@/styles/App.css';
import Tooltip from "@/components/custom/Tooltip";
import Sidenavbar from "@/components/custom/Sidenavbar";
import { ProgressBar } from "@/components/custom/ProgressBar"
import ModelDetails from "@/components/custom/ModelDetails";
import { TrainingMetricsChart } from "@/components/charts/TrainingMetricsChart.jsx";
import { resnet50 } from "@/components/charts/results/resnet50"
import { ClassificationMetrics } from "@/components/charts/ClassificationMetrics"
import DatasetClassification from "@/components/custom/DatasetClassification";




const sections = [
  { id: "model", title: "Model" },
  { id: "dataset", title: "Dataset" },
  { id: "results", title: "Results" }
]

const ResNet = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[67vw] lg:w-[80vw] overflow-x-hidden relative">
      <Sidenavbar />
        <div className="flex flex-col w-full lg:w-[70%] pt-5 ">
            <div id="model">
                <ModelDetails defaultModel="resnet50"/>
            </div>
            <div id="dataset">
                <DatasetClassification/>
            </div>

            {/*<TrainingMetricsChart modelName="ResNet50" data={resnet50} />*/}

            <div id="results" className="mt-[80px]">
                <ClassificationMetrics modelName="resnet50" />
            </div>
        </div>
        <Tooltip/>
        <div className="hidden lg:block">
            <ProgressBar sections={sections}/>
        </div>

    </div>
  )
}

export default ResNet

