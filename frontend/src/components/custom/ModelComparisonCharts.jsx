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
import { Info, ChevronDown, X, Clock, Binary, Variable } from "lucide-react"
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
import {Separator} from "@/components/ui/separator";

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

function parseValue(str) {
  if (!str) return 0
  const numeric = parseFloat(str)
  return isNaN(numeric) ? 0 : numeric
}

export function ModelComparisonCharts({
  predictions = {},
  models = ["ResNet50", "EfficientNetB0", "VGG16"],
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

  const rRes = predictions.resnet || {}
  const rEff = predictions.efficientnet || {}
  const rVgg = predictions.vgg || {}

  const dynamicRadarData = React.useMemo(() => {
    return [
      {
        metric: "Accuracy (%)",
        ResNet50: Math.round((rRes.probability || 0) * 100),
        EfficientNetB0: Math.round((rEff.probability || 0) * 100),
        VGG16: Math.round((rVgg.probability || 0) * 100),
        fullMark: 100
      },
      {
        metric: "Parameters (M)",
        ResNet50: parseValue(rRes.modelParameters),
        EfficientNetB0: parseValue(rEff.modelParameters),
        VGG16: parseValue(rVgg.modelParameters),
        fullMark: 150
      },
      {
        metric: "FLOPs (B)",
        ResNet50: parseValue(rRes.flops),
        EfficientNetB0: parseValue(rEff.flops),
        VGG16: parseValue(rVgg.flops),
        fullMark: 20
      },
      {
        metric: "Inference Time (ms)",
        ResNet50: Math.round(rRes.inference_time || 0),
        EfficientNetB0: Math.round(rEff.inference_time || 0),
        VGG16: Math.round(rVgg.inference_time || 0),
        fullMark: 100
      }
    ]
  }, [rRes, rEff, rVgg])

  return (
    <Drawer modal>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="mx-auto w-fit flex items-center gap-2 px-4 py-2 text-sm bg-[#151727] text-white border border-[#2A2C3F] hover:bg-[#fff]"
        >
          <Info className="h-4 w-4" />
          <span>Model Performance</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[linear-gradient(135deg,_rgba(37,42,98,0.85),_rgba(0,0,0,0.65),_rgba(2,2,2,0.75))] backdrop-blur-md text-white max-h-[90vh] mx-auto w-full sm:max-w-[100%] md:max-w-[70%] lg:max-w-[90%] xl:max-w-[50%] rounded-t-lg">
        <div className="mx-auto w-full">
          <DrawerHeader className="sticky top-0 z-10 border-b-0 border-white
            shadow-[0_4px_6px_rgba(255,255,255,0.1)]">
            <DrawerTitle className="text-2xl mb-4 flex justify-center">Model Comparison Charts</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" className="absolute top-4 right-4 p-5 hover:bg-opacity-100 cursor-pointer" aria-label="Close">
                <X className="h-2 w-2 back bg-[#24275b]/50 " />
              </Button>
            </DrawerClose>
            {/*<DrawerDescription className=" flex justify-center">Compare metrics across the CNNs</DrawerDescription>*/}
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
           <Card className="border-[#2A2C3F]">
              <CardContent>
                {/* Two columns: left for gauge, right for details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left column: Confidence Score Gauge */}
                  <div>
                    <CardHeader>
                      <CardTitle className="font-semibold text-xl flex justify-center">
                        Confidence Score
                      </CardTitle>
                      <Separator className="bg-[#2A2C3F]" />
                    </CardHeader>
                    <div className="flex justify-center">
                      <GaugeChart
                        value={confidence}
                        model={selectedModel}
                        color={modelColors[selectedModel]}
                      />
                    </div>
                  </div>

                  {/* Right column: Model Details (3 rows) */}
                  <div>
                    <CardHeader>
                      <CardTitle className="font-semibold text-xl flex justify-center">
                        Model Details
                      </CardTitle>
                      <Separator className="bg-[#2A2C3F]" />
                    </CardHeader>
                    <div className="grid grid-rows-3 gap-4 text-center">
                      {/* Inference */}
                      <div>
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400"/>
                          <span className="text-gray-400">Inference</span>
                        </div>
                        <p className="text-lg">{inference} ms</p>
                      </div>

                      {/* FLOPs */}
                      <div>
                        <div className="flex items-center justify-center gap-2">
                          <Binary className="h-4 w-4 text-gray-400"/>
                          <span className="text-gray-400">FLOPs</span>
                        </div>
                        <p className="text-lg">{flops}</p>
                      </div>

                      {/* Parameters */}
                      <div>
                        <div className="flex items-center justify-center gap-2">
                          <Variable className="h-4 w-4 text-gray-400"/>
                          <span className="text-gray-400">Parameters</span>
                        </div>
                        <p className="text-lg">{params}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#2A2C3F]">
              <CardHeader>
                <CardTitle className="font-semibold text-xl flex justify-center">Polar Grid Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={dynamicRadarData}>
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
            <Card className="border-[#2A2C3F]">
              <CardHeader>
                <CardTitle>Latency by Input Size</CardTitle>
                <CardDescription>Prediction latency (ms) for different input image sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <HeatmapGrid data={heatmapData} models={models} sizes={imageSizes} />
              </CardContent>
            </Card>
          </div>
          <DrawerFooter className="bg-[#020617]/20 sticky bottom-0 z-10">
            {/*<DrawerClose asChild>*/}
            {/*  <Button variant="default">Close</Button>*/}
            {/*</DrawerClose>*/}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
