import React from 'react';
import Sidenavbar from "@/components/custom/Sidenavbar";
import DataTable from "@/components/charts/DataTable";
import Tooltip from "@/components/custom/Tooltip";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent, ChartContainer } from "@/components/ui/chart"
import ModelDetails from "@/components/custom/ModelDetails";
import DatasetClassification from "@/components/custom/DatasetClassification";
import ClassificationMetrics from "@/components/charts/ClassificationMetrics";




const chartData = [
  { month: "10", VGG16: 55.2, VGG19: 64.8 },
  { month: "50", VGG16: 65.4, VGG19: 71.9 },
  { month: "100", VGG16: 70.6, VGG19: 77.8 },
  { month: "150", VGG16: 82.1, VGG19: 70.5 },
  { month: "200", VGG16: 85.3, VGG19: 79.9 },
  { month: "250", VGG16: 87.0, VGG19: 80.4 },
];


const chartConfig = {
  VGG16: {
    label: "VGG16",
    color: "#2563eb",
  },
  VGG19: {
    label: "VGG19",
    color: "#60a5fa",
  },
}
const VGG = () => {
     return (
        <div className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:w-[80vw] overflow-x-hidden relative">
            <Sidenavbar/>
            <div className="flex flex-col w-full lg:w-[70%] pt-17">
                <div id="model">
                    <ModelDetails defaultModel="vgg16" />
                </div>
                <div id="dataset">
                    <DatasetClassification/>
                </div>

                <div id="results" className="mt-[80px]">
                   <ClassificationMetrics modelName="vgg16" />
                </div>

            </div>
            <Tooltip/>
        </div>
    );
}

export default VGG;