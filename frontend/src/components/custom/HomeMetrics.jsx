"use client"
import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, ChevronDown } from "lucide-react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

function HeatmapGrid({ data, models, sizes }) {
  if (!data || !data.length) {
    return <div className="text-center text-sm text-gray-400">No heatmap data yet.</div>
  }
  const minVal = Math.min(...data.map((d) => d.value))
  const maxVal = Math.max(...data.map((d) => d.value))
  const getColor = (val) => {
    const ratio = (val - minVal) / (maxVal - minVal || 1)
    const r = Math.floor(200 * ratio) + 55
    const g = Math.floor(200 * (1 - ratio)) + 55
    return `rgb(${r}, ${g}, 50)`
  }
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left">Model</th>
            {sizes.map((size) => (
              <th key={size} className="p-2 text-center">
                {size}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model}>
              <td className="p-2 font-medium">{model}</td>
              {sizes.map((size) => {
                const cell = data.find((d) => d.model === model && d.size === size)
                if (!cell) {
                  return (
                    <td key={`${model}-${size}`} className="p-2 text-center text-gray-400">
                      —
                    </td>
                  )
                }
                return (
                  <td key={`${model}-${size}`} className="p-2">
                    <div
                      className="flex items-center justify-center rounded-md p-2 text-xs font-medium"
                      style={{
                        backgroundColor: getColor(cell.value),
                        color: cell.value > (minVal + maxVal) / 2 ? "white" : "black",
                        width: "60px",
                        height: "40px",
                      }}
                    >
                      {Math.round(cell.value)} ms
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GaugeChart({ value = 0, model = "", color = "#60a5fa" }) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const progress = (value / 100) * circumference
  const strokeDashoffset = circumference - progress
  React.useEffect(() => {
    const circle = document.getElementById(`gauge-circle-${model}`)
    if (circle) {
      circle.style.transition = "stroke-dashoffset 1s ease-in-out"
      circle.style.strokeDashoffset = `${strokeDashoffset}`
    }
  }, [value, model, strokeDashoffset])
  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="transparent"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset="0"
          transform="rotate(-90 90 90)"
        />
        <circle
          id={`gauge-circle-${model}`}
          cx="90"
          cy="90"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform="rotate(-90 90 90)"
          strokeLinecap="round"
        />
        <text
          x="90"
          y="90"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill="currentColor"
        >
          {value}%
        </text>
        <text x="90" y="115" textAnchor="middle" fontSize="12" fill="currentColor">
          Confidence
        </text>
      </svg>
    </div>
  )
}

export function HomeMetrics({
  predictions = {},
  models = ["ResNet50", "EfficientNetB0", "VGG16"],
  radarData = [
    { metric: "Accuracy (%)", ResNet50: 76.2, EfficientNetB0: 70.5, VGG16: 71.3, fullMark: 100 },
    { metric: "Parameters (M)", ResNet50: 25.6, EfficientNetB0: 5.3, VGG16: 138, fullMark: 150 },
    { metric: "FLOPs (B)", ResNet50: 4.1, EfficientNetB0: 0.4, VGG16: 15.5, fullMark: 20 },
    { metric: "Inference Time (ms)", ResNet50: 45, EfficientNetB0: 25, VGG16: 60, fullMark: 100 },
  ],
  heatmapData = [],
  imageSizes = [],
  modelColors = {
    ResNet50: "#60a5fa",
    EfficientNetB0: "#34d399",
    VGG16: "#fb923c",
  },
}) {
  const [selectedModel, setSelectedModel] = React.useState("ResNet50")
  const mapping = { ResNet50: "resnet", EfficientNetB0: "efficientnet", VGG16: "vgg" }
  const backendKey = mapping[selectedModel]
  const data = predictions[backendKey] || {}
  const confidence = Math.round((data.probability || 0) * 100)
  const inference = Math.round(data.inference_time || 0)
  const flops = data.flops || ""
  const params = data.modelParameters || ""

  return (
    <Drawer modal>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="mx-auto w-fit flex items-center gap-2 px-4 py-2 text-sm bg-[#151727] text-white border border-[#2a2d3d] hover:bg-[#1c1f36]"
        >
          <Info className="h-4 w-4" />
          <span>Model Performance</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#151727] text-white max-h-[90vh] mx-auto w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] rounded-t-lg">
        <div className="mx-auto w-full">
          <DrawerHeader className="sticky top-0 z-10 bg-[#151727]">
            <DrawerTitle className="text-2xl">Deep Learning Model Performance</DrawerTitle>
            <DrawerDescription>Compare metrics across different deep learning models</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(90vh-10rem)] pb-32">
            <div className="flex justify-center space-x-4 mb-4">
              {models.map((m) => (
                <Button
                  key={m}
                  variant={selectedModel === m ? "default" : "outline"}
                  onClick={() => setSelectedModel(m)}
                  style={{
                    borderColor: selectedModel === m ? modelColors[m] : undefined,
                    backgroundColor: selectedModel === m ? modelColors[m] : undefined,
                  }}
                >
                  {m}
                </Button>
              ))}
            </div>
            <Card className="bg-[#1c1f36] border-[#2a2d3d]">
              <CardHeader>
                <CardTitle>Confidence Score</CardTitle>
                <CardDescription>Prediction confidence for the selected model</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <GaugeChart value={confidence} model={selectedModel} color={modelColors[selectedModel]} />
              </CardContent>
            </Card>
            <Card className="bg-[#1c1f36] border-[#2a2d3d]">
              <CardHeader>
                <CardTitle>Model Comparison</CardTitle>
                <CardDescription>Performance metrics across different models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
                      {models.map((m) => (
                        <Radar
                          key={m}
                          name={m}
                          dataKey={m}
                          stroke={modelColors[m]}
                          fill={modelColors[m]}
                          fillOpacity={0.6}
                        />
                      ))}
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#1c1f36] border-[#2a2d3d]">
              <CardHeader>
                <CardTitle>Model Details</CardTitle>
                <CardDescription>Inference time, FLOPs, and parameters</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-semibold text-lg">Inference</p>
                  <p className="text-sm">{inference} ms</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">FLOPs</p>
                  <p className="text-sm">{flops}</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">Parameters</p>
                  <p className="text-sm">{params}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#1c1f36] border-[#2a2d3d]">
              <CardHeader>
                <CardTitle>Latency by Input Size</CardTitle>
                <CardDescription>Prediction latency (ms) for different input image sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <HeatmapGrid data={heatmapData} models={models} sizes={imageSizes} />
              </CardContent>
            </Card>
          </div>
          <DrawerFooter className="bg-[#151727] sticky bottom-0 z-10">
            <DrawerClose asChild>
              <Button variant="default">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
