import React from 'react';
import Sidenavbar from "@/components/sidenavbar";
import DataTable from "@/components/DataTable";
import Tooltip from "@/components/Tooltip";

const EfficientNet = () => {
    return (
        <div className="documentation">
            <Sidenavbar/>
            <div className="content">
                <h1>EfficientNet</h1>
                <div className="tabs">
                    <a href="/documentation">Documentation</a>
                </div>
                <p>EfficientNet is a family of convolutional neural networks (CNNs) designed for image classification tasks. It achieves state-of-the-art accuracy while being more computationally efficient than previous models. EfficientNet uses a compound scaling method that uniformly scales all dimensions of depth, width, and resolution, leading to better performance with fewer parameters. The model variants are named EfficientNet-B0 to EfficientNet-B7, with increasing complexity and accuracy. EfficientNet has been widely adopted for various computer vision tasks due to its balance of accuracy and efficiency.</p>
                <DataTable/>
            </div>
            <Tooltip/>
        </div>
    );
}

export default EfficientNet;