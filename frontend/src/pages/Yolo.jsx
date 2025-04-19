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

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "architecture", title: "Architecture" },
  { id: "performance", title: "Models overview" },
  { id: "results", title: "Results" },
]

const Yolo = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:w-[80vw] overflow-x-hidden relative">
      <Sidenavbar />
        <div className="flex flex-col w-full lg:w-[70%] pt-17 ">
            {/*<h1>ResNet</h1>*/}
            {/*<a href="https://viso.ai/deep-learning/resnet-residual-neural-network/" className="w-42 mb-7">*/}
            {/*Documentation*/}
            {/*</a>*/}

            {/*<TwoLevelPieChart />*/}
            {/*<h2 id="introduction">Introduction</h2>*/}
            {/*<p className="my-[40px]">*/}
            {/*  ResNet (Residual Network) is a deep learning model used for image classification tasks. It addresses the*/}
            {/*  vanishing gradient problem by introducing residual connections, which allow gradients to flow through the*/}
            {/*  network more effectively.*/}
            {/*</p>*/}


            <ModelDetails defaultModel="yolo11"/>

            <h2 id="architecture" className="text-2xl pt-20">Training </h2>
            <p className="my-[40px]">
                This is achieved by adding shortcut connections that skip one or more layers. ResNet models come in
                various
                depths, such as ResNet-18, ResNet-34, ResNet-50, ResNet-101, and ResNet-152, where the number indicates
                the
                number of layers.
            </p>

            {/*<RadioButton />*/}
            <LineChart/>

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

export default Yolo

