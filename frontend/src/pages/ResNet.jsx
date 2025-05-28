import React from 'react';
import '@/styles/App.css';
import Tooltip from "@/components/custom/Tooltip";
import Sidenavbar from "@/components/custom/Sidenavbar";
import DataTable from "@/components/charts/DataTable";
import { ProgressBar } from "@/components/custom/ProgressBar"
import ModelDetails from "@/components/custom/ModelDetails";
import { TrainingMetricsChart } from "@/components/charts/TrainingMetricsChart.jsx";
import { resnet50 } from "@/components/charts/results/resnet50"


const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "architecture", title: "Architecture" },
  { id: "performance", title: "Models overview" },
  { id: "results", title: "Results" },
]

const ResNet = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:w-[80vw] overflow-x-hidden relative">
      <Sidenavbar />
        <div className="flex flex-col w-full lg:w-[70%] pt-17 ">
            {/*<h1>ResNet</h1>*/}
            {/*<a href="https://viso.ai/deep-learning/resnet-residual-neural-network/" className="w-42 mb-7">*/}
            {/*Documentation*/}
            {/*</a>*/}

            {/*<TwoLevelPieChart />*/}
            <ModelDetails defaultModel="resnet50"/>
            {/*<RadioButton />*/}
            {/*<LineChart/>*/}
            <TrainingMetricsChart modelName="ResNet50" data={resnet50} />


            <div id="results" className="mt-[80px]">
                <h2>Results</h2>
                <p className="my-[40px]">
                    These models have achieved state-of-the-art performance on various image recognition benchmarks.
                </p>
                < DataTable/>
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

