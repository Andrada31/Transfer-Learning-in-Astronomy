import React from 'react';
import Sidenavbar from "@/components/custom/sidenavbar";
import DataTable from "@/components/custom/DataTable";
import Tooltip from "@/components/custom/Tooltip";

const VGG = () => {
     return (
        <div className="flex flex-col items-center justify-center w-full px-[20%]">
            <Sidenavbar/>
            <div className="flex flex-col w-full lg:w-[70%] pt-17 lg:px-[4%]">
                <h1>VGG</h1>
                <div className="tabs">
                    <a href="/documentation">Documentation</a>
                </div>
                <p  className="my-[40px]">VGG is a convolutional neural network model proposed by K. Simonyan and A. Zisserman from the University of Oxford. It is known for its simplicity and use of very small (3x3) convolution filters. The model comes in several variants, such as VGG-16 and VGG-19, where the number indicates the number of weight layers. VGG models have been widely used for image classification tasks and have achieved excellent performance on various benchmarks</p>
                <DataTable/>
            </div>
            <Tooltip/>
        </div>
    );
}

export default VGG;