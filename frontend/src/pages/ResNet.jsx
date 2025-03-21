import React from 'react';
import '@/styles/App.css';
import Tooltip from "@/components/custom/Tooltip";
import Sidenavbar from "@/components/custom/sidenavbar";
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

const modelData = {
    modelName: "ResNet-50",
    overviewData: {
      description:
        "ResNet50 is a convolutional neural network that is 50 layers deep. It was introduced in the paper 'Deep Residual Learning for Image Recognition' and is known for introducing skip connections to solve the vanishing gradient problem in deep networks.",
      yearPublished: "2015",
      authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
      paperLink: "https://arxiv.org/abs/1512.03385",
    },
    architectureData: {
      layers: 50,
      parameters: "25.6 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "Residual connections (skip connections)",
        "Batch normalization after each convolution",
        "Global average pooling",
        "Bottleneck design for computational efficiency",
      ],
    },
    trainingData: {
      dataset: "ImageNet (1.28 million training images)",
      accuracy: "75.3%",
      trainingTime: "~2 weeks on 8 GPUs",
      hardware: "NVIDIA Tesla P100 GPUs",
      evaluationMetrics: {
        "Top-1 Accuracy": "75.3%",
        "Top-5 Accuracy": "92.2%",
        Parameters: "25.6M",
        FLOPs: "3.8G",
        "Inference Time": "4.6ms/image",
      },
    },
  }

const ResNet = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full  overflow-x-hidden relative">
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

        {/*<h2 id="architecture">Architecture</h2>*/}
        {/*<p className="my-[40px]">*/}
        {/*  This is achieved by adding shortcut connections that skip one or more layers. ResNet models come in various*/}
        {/*  depths, such as ResNet-18, ResNet-34, ResNet-50, ResNet-101, and ResNet-152, where the number indicates the*/}
        {/*  number of layers.*/}
        {/*</p>*/}

        <ModelDetails
        modelName={modelData.modelName}
        overviewData={modelData.overviewData}
        architectureData={modelData.architectureData}
        trainingData={modelData.trainingData}
      />

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

