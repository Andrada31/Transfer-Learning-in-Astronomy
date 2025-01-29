import React from 'react';
import '../assets/styles/App.css';
import Tooltip from "@/components/Tooltip";
import Sidenavbar from "@/components/sidenavbar";
import DataTable from "@/components/DataTable";

const ResNet = () => {
    return (
        <div className="documentation">
            <Sidenavbar/>
            <div className="content">
                <h1>ResNet</h1>
                <div className="tabs">
                    <a href="/documentation">Documentation</a>
                </div>
                <p>ResNet (Residual Network) is a deep learning model used for image classification tasks. It addresses
                    the vanishing gradient problem by introducing residual connections, which allow gradients to flow
                    through the network more effectively. This is achieved by adding shortcut connections that skip one
                    or more layers. ResNet models come in various depths, such as ResNet-18, ResNet-34, ResNet-50,
                    ResNet-101, and ResNet-152, where the number indicates the number of layers. These models have
                    achieved state-of-the-art performance on various image recognition benchmarks.</p>
                <DataTable/>
            </div>
            <Tooltip/>
        </div>
    );
};

export default ResNet;