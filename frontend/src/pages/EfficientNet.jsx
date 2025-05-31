import React from 'react';
import Sidenavbar from "@/components/custom/Sidenavbar";
import Tooltip from "@/components/custom/Tooltip";
import ModelDetails from "@/components/custom/ModelDetails";
import DatasetClassification from "@/components/custom/DatasetClassification";
import ClassificationMetrics from "@/components/charts/ClassificationMetrics";
import {ProgressBar} from "@/components/custom/ProgressBar";

const sections = [
  { id: "model", title: "Model" },
  { id: "dataset", title: "Dataset" },
  { id: "results", title: "Results" }
]

const EfficientNet = () => {
    return (
        <div
            className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[67vw] lg:w-[80vw] overflow-x-hidden relative">
            <Sidenavbar/>
            <div className="flex flex-col w-full lg:w-[70%] pt-5">
                <div id="model">
                    <ModelDetails defaultModel="efficientnetb0"/>
                </div>
                <div id="dataset">
                    <DatasetClassification/>
                </div>

                <div id="results" className="mt-[80px]">
                    <ClassificationMetrics modelName="efficientnetb0"/>

                </div>

            </div>
            <Tooltip/>
            <div className="hidden lg:block">
                <ProgressBar sections={sections}/>
            </div>
        </div>
    );
}

export default EfficientNet;