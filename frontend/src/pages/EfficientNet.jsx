import React from 'react';
import Sidenavbar from "@/components/custom/sidenavbar";
import DataTable from "@/components/charts/DataTable";
import Tooltip from "@/components/custom/Tooltip";

const EfficientNet = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full px-[20%]">
            <Sidenavbar/>
            <div className="flex flex-col w-full lg:w-[70%] pt-17 lg:px-[4%]">
                <h1>EfficientNet</h1>
                <div className="tabs">
                    <a href="https://viso.ai/deep-learning/efficientnet/">Documentation</a>
                </div>
                <p  className="my-[40px]">EfficientNet is a family of convolutional neural networks (CNNs) designed for image classification tasks. It achieves state-of-the-art accuracy while being more computationally efficient than previous models. EfficientNet uses a compound scaling method that uniformly scales all dimensions of depth, width, and resolution, leading to better performance with fewer parameters. The model variants are named EfficientNet-B0 to EfficientNet-B7, with increasing complexity and accuracy. EfficientNet has been widely adopted for various computer vision tasks due to its balance of accuracy and efficiency.</p>
                <DataTable/>
            </div>
            <Tooltip/>
        </div>
    );
}

export default EfficientNet;