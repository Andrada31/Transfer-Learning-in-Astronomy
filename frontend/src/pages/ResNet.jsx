import React from 'react';
import '@/styles/App.css';
import Tooltip from "@/components/custom/Tooltip";
import Sidenavbar from "@/components/custom/sidenavbar";
import DataTable from "@/components/charts/DataTable";
import RadioButton from "@/components/headlessui/RadioGroup";
import TwoLevelPieChart from "@/components/charts/TwoLevelPieChart";
import LineChart from "@/components/charts/LineChart";
import { ProgressBar } from "@/components/custom/ProgressBar"

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "architecture", title: "Architecture" },
  { id: "performance", title: "Models overview" },
  { id: "results", title: "Results" },
]

const ResNet = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-[20%] overflow-x-hidden relative">
      <Sidenavbar />
      <div className="flex flex-col w-full lg:w-[70%] pt-17 lg:px-[4%]">
        <h1>ResNet</h1>
        <a href="https://viso.ai/deep-learning/resnet-residual-neural-network/" className="w-42">
          Documentation
        </a>

        <TwoLevelPieChart />
        <h2 id="introduction">Introduction</h2>
        <p className="my-[40px]">
          ResNet (Residual Network) is a deep learning model used for image classification tasks. It addresses the
          vanishing gradient problem by introducing residual connections, which allow gradients to flow through the
          network more effectively.
        </p>

        <h2 id="architecture">Architecture</h2>
        <p className="my-[40px]">
          This is achieved by adding shortcut connections that skip one or more layers. ResNet models come in various
          depths, such as ResNet-18, ResNet-34, ResNet-50, ResNet-101, and ResNet-152, where the number indicates the
          number of layers.
        </p>

        <h2 id="performance" className="my-[40px]">Models overview</h2>
        <RadioButton />
        <LineChart />

        <div id="results"  className="mt-[80px]">
          <h2>Results</h2>
          <p className="my-[40px]">
            These models have achieved state-of-the-art performance on various image recognition benchmarks.
          </p>
          < DataTable/>
        </div>
      </div>
      <Tooltip />
      <ProgressBar sections={sections} />
    </div>
  )
}

export default ResNet

