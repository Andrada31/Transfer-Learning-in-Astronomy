"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LineChartIcon as ChartLine, Expand } from "lucide-react"

import { yolo11nMetrics } from "@/components/charts/results/yolo11n"
import { yolov8Metrics } from "@/components/charts/results/yolov8"

export default function YoloMetricsDashboard() {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState("YOLOv8")
  const [modalMetric, setModalMetric] = useState(null)

  useEffect(() => {
    const variants = [
      {
        name: "YOLOv8",
        data: yolov8Metrics,
        description: "YOLOv8 - nano model"
      },
      {
        name: "YOLO11n",
        data: yolo11nMetrics,
        description: "YOLO11n - custom model"
      }
    ]
    setModels(variants)
    setSelectedModel("YOLOv8")
  }, [])

  const currentModel = models.find(m => m.name === selectedModel)
  const currentData = currentModel?.data || []
  const lastEpoch = currentData[currentData.length - 1] || {}

  const chartConfig = {
    margin: { top: 10, right: 10, left: 10, bottom: 20 },
    grid: { strokeDasharray: "3 3", stroke: "#333" },
    axes: { stroke: "#fff", tick: { fill: "#fff", fontSize: 10 } },
    tooltip: {
      contentStyle: {
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: "4px",
        color: "#fff",
        fontSize: "12px"
      }
    }
  }

  const MetricChart = ({ title, dataKey, color = "#6c88da", domain }) => (
    <div className="bg-transparent relative group">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-white text-sm font-medium text-center flex-1">{title}</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 text-white/60 hover:text-white hover:bg-white/10 cursor-pointer select-none"
            >
              <Expand className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-7xl sm:max-w-4xl bg-[#0b0b11] border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">{title} - {selectedModel}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="epoch" stroke="#fff" tick={{ fill: "#fff" }} label={{ value: "Epoch", position: "insideBottom", offset: -10, style: { textAnchor: "middle", fill: "#fff" } }} />
                    <YAxis stroke="#fff" tick={{ fill: "#fff" }} domain={domain || ["dataMin", "dataMax"]} />
                    <Tooltip {...chartConfig.tooltip} />
                    <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} dot={{ fill: color, strokeWidth: 0, r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-gray-400 text-sm">Initial Value</div>
                  <div className="text-white text-lg font-bold">{currentData[0]?.[dataKey]?.toFixed(4) || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Final Value</div>
                  <div className="text-white text-lg font-bold">{lastEpoch[dataKey]?.toFixed(4) || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Change</div>
                  <div className={`text-lg font-bold ${(lastEpoch[dataKey] || 0) > (currentData[0]?.[dataKey] || 0) ? "text-green-400" : "text-red-400"}`}>
                    {currentData[0]?.[dataKey] && lastEpoch[dataKey]
                      ? `${(((lastEpoch[dataKey] - currentData[0][dataKey]) / currentData[0][dataKey]) * 100).toFixed(1)}%`
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={currentData} {...chartConfig}>
          <CartesianGrid {...chartConfig.grid} />
          <XAxis dataKey="epoch" {...chartConfig.axes} />
          <YAxis {...chartConfig.axes} domain={domain || ["dataMin", "dataMax"]} />
          <Tooltip {...chartConfig.tooltip} />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 1 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )

  return (
    <div className="w-full min-h-screen px-0 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 my-8">
          <ChartLine className="h-8 w-8 text-white" />
          <h2 className="text-2xl text-white">Results on Balanced Dataset</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Label htmlFor="model-select" className="text-white/80">Select Model:</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[300px] bg-[#2a3158] border-white/20 text-white cursor-pointer">
              <SelectValue placeholder="Choose a YOLO model" />
            </SelectTrigger>
            <SelectContent className="border-white/20 bg-[#2a3158]">
              {models.map(m => (
                <SelectItem key={m.name} value={m.name} className="text-white focus:bg-[#161b36]">
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <h2 className="text-white text-xl font-semibold mb-6">Training Losses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricChart title="train/box_loss" dataKey="train/box_loss" />
          <MetricChart title="train/cls_loss" dataKey="train/cls_loss" />
          <MetricChart title="train/dfl_loss" dataKey="train/dfl_loss" />
        </div>

        <h2 className="text-white text-xl font-semibold mb-6">Validation Losses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricChart title="val/box_loss" dataKey="val/box_loss" />
          <MetricChart title="val/cls_loss" dataKey="val/cls_loss" />
          <MetricChart title="val/dfl_loss" dataKey="val/dfl_loss" />
        </div>

        <h2 className="text-white text-xl font-semibold mb-6">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricChart title="Precision" dataKey="metrics/precision(B)" domain={[0, 1]} />
          <MetricChart title="Recall" dataKey="metrics/recall(B)" domain={[0, 1]} />
          <MetricChart title="mAP@50" dataKey="metrics/mAP50(B)" domain={[0, 1]} />
          <MetricChart title="mAP@50:95" dataKey="metrics/mAP50-95(B)" domain={[0, 1]} />
        </div>

        <div className="border border-white/20 p-6 rounded-lg bg-[#2a3158]">
          <h2 className="text-white text-xl mb-4">Summary of RESULTS - {selectedModel}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div><div className="text-gray-400 text-sm">Total Epochs</div><div className="text-blue-300 text-2xl font-bold">{currentData.length}</div></div>
            <div><div className="text-gray-400 text-sm">Final Precision</div><div className="text-blue-300 text-2xl font-bold">{(lastEpoch["metrics/precision(B)"] * 100).toFixed(1)}%</div></div>
            <div><div className="text-gray-400 text-sm">Final Recall</div><div className="text-blue-300 text-2xl font-bold">{(lastEpoch["metrics/recall(B)"] * 100).toFixed(1)}%</div></div>
            <div><div className="text-gray-400 text-sm">Final mAP@50</div><div className="text-blue-300 text-2xl font-bold">{(lastEpoch["metrics/mAP50(B)"] * 100).toFixed(1)}%</div></div>
            <div><div className="text-gray-400 text-sm">Final mAP@50:95</div><div className="text-blue-300 text-2xl font-bold">{(lastEpoch["metrics/mAP50-95(B)"] * 100).toFixed(1)}%</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
