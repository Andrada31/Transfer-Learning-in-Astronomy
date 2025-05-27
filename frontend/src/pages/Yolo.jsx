import React from 'react';
import '@/styles/App.css';
import Tooltip from "@/components/custom/Tooltip";
import Sidenavbar from "@/components/custom/Sidenavbar";
import DataTable from "@/components/charts/DataTable";
import RadioButton from "@/components/headlessui/RadioGroup";
import TwoLevelPieChart from "@/components/charts/TwoLevelPieChart";
import LineChart from "@/components/charts/LineChart";
import { ProgressBar } from "@/components/custom/ProgressBar"
import ModelDetails from "@/components/custom/ModelDetails";
import DatasetComparison from "@/components/custom/DatasetComparison";
import YoloMetricsDashboard from "@/components/charts/YOLOMetricsChart";

const sections = [
  { id: "model", title: "Model" },
  { id: "dataset", title: "Dataset" },
  { id: "results", title: "Results" },
]

const Yolo = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:w-[80vw] overflow-x-hidden relative">
      <Sidenavbar />
        <div className="flex flex-col w-full lg:w-[70%] pt-17" id="model">
            <ModelDetails defaultModel="yolo11"/>
            <div id="dataset"></div>
            <DatasetComparison/>

            {/*<RadioButton />*/}
            {/*<LineChart/>*/}
            <div id="results"></div>
            <YoloMetricsDashboard/>

            {/*<div id="results" className="mt-[80px]">*/}
            {/*    <h2>Results</h2>*/}
            {/*    <p className="my-[40px]">*/}
            {/*        These models have achieved state-of-the-art performance on various image recognition benchmarks.*/}
            {/*    </p>*/}
            {/*    < DataTable/>*/}
            {/*</div>*/}
        </div>
        <Tooltip/>
        <div className="hidden lg:block">
            <ProgressBar sections={sections}/>
        </div>

    </div>
  )
}

export default Yolo

