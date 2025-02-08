import React from 'react';
import '../assets/styles/App.css';
import Tooltip from "@/components/custom/Tooltip";
import Sidenavbar from "@/components/custom/sidenavbar";
import DataTable from "@/components/custom/DataTable";
import RadioButton from "@/components/headlessui/RadioGroup";
import TwoLevelPieChart from "@/components/charts/TwoLevelPieChart";
import LineChart from "@/components/charts/LineChart";

const ResNet = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full px-[20%]">
            <Sidenavbar/>
            <div className="flex flex-col w-full lg:w-[70%] pt-17 lg:px-[4%]">
                <h1>ResNet</h1>
                <div className="tabs">
                    <a href="/documentation">
                        Documentation
                    </a>
                </div>

                <TwoLevelPieChart/>
                <p className="my-[40px]">
                    ResNet (Residual Network) is a deep learning model used for image classification tasks. It addresses
                    the vanishing gradient problem by introducing residual connections, which allow gradients to flow
                    through the network more effectively. This is achieved by adding shortcut connections that skip one
                    or more layers. ResNet models come in various depths, such as ResNet-18, ResNet-34, ResNet-50,
                    ResNet-101, and ResNet-152, where the number indicates the number of layers. These models have
                    achieved state-of-the-art performance on various image recognition benchmarks.
                </p>
                <RadioButton/>
                <LineChart/>
                <DataTable/>
            </div>
            <Tooltip/>
        </div>

    );
};

export default ResNet;