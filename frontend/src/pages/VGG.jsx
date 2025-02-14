import React from 'react';
import Sidenavbar from "@/components/custom/sidenavbar";
import DataTable from "@/components/charts/DataTable";
import Tooltip from "@/components/custom/Tooltip";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent, ChartContainer } from "@/components/ui/chart"



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
        <div className="flex flex-col items-center justify-center w-full px-[20%]">
            <Sidenavbar/>
            <div className="flex flex-col w-full lg:w-[70%] pt-17 lg:px-[4%]">
                <h1>VGG</h1>
                <div className="tabs">
                    <a href="https://viso.ai/deep-learning/vgg-very-deep-convolutional-networks/">Documentation</a>
                </div>
                <p  className="my-[40px]">VGG is a convolutional neural network model proposed by K. Simonyan and A. Zisserman from the University of Oxford. It is known for its simplicity and use of very small (3x3) convolution filters. The model comes in several variants, such as VGG-16 and VGG-19, where the number indicates the number of weight layers. VGG models have been widely used for image classification tasks and have achieved excellent performance on various benchmarks</p>
                <ChartContainer config={chartConfig} className="h-[3cd00px] w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="VGG16" fill="var(--color-VGG16)" radius={4} />
                    <Bar dataKey="VGG19" fill="var(--color-VGG19)" radius={4} />
                  </BarChart>
                </ChartContainer>

                <DataTable/>


            </div>
            <Tooltip/>
        </div>
    );
}

export default VGG;