import React from 'react';
import Sidenavbar from "@/components/imported/sidenavbar";
import DataTable from "@/components/imported/DataTable";
import Tooltip from "@/components/imported/Tooltip";

const VGG = () => {
     return (
        <div className="documentation">
            <Sidenavbar/>
            <div className="content">
                <h1>VGG</h1>
                <div className="tabs">
                    <a href="/documentation">Documentation</a>
                </div>
                <p>VGG is a convolutional neural network model proposed by K. Simonyan and A. Zisserman from the University of Oxford. It is known for its simplicity and use of very small (3x3) convolution filters. The model comes in several variants, such as VGG-16 and VGG-19, where the number indicates the number of weight layers. VGG models have been widely used for image classification tasks and have achieved excellent performance on various benchmarks</p>
                <DataTable/>
            </div>
            <Tooltip/>
        </div>
    );
}

export default VGG;