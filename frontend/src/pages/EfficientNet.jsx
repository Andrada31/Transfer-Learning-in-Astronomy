import React from 'react';
import Sidenavbar from "@/components/custom/Sidenavbar";
import Tooltip from "@/components/custom/Tooltip";
import ModelDetails from "@/components/custom/ModelDetails";
import DatasetClassification from "@/components/custom/DatasetClassification";
import ClassificationMetrics from "@/components/charts/ClassificationMetrics";

const EfficientNet = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:w-[80vw] overflow-x-hidden relative">
            <Sidenavbar/>
            <div className="flex flex-col w-full lg:w-[70%] pt-17">
                <div id="model">
                    <ModelDetails defaultModel="efficientnetb0"/>
                </div>
                <div id="dataset">
                    <DatasetClassification/>
                </div>


                <div id="results" className="mt-[80px]">
                   <ClassificationMetrics modelName="efficientnetb0" />

                </div>

            </div>
            <Tooltip/>
        </div>
    );
}

export default EfficientNet;