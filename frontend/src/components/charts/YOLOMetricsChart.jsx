"use client"

import { useEffect, useState } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {Database, ChartLine} from "lucide-react";

export default function YoloMetricsDashboard() {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/results-L9rd6fm8r0IPpmsJXQL36uNZV5aiUX.csv"
        )
        const csvText = await response.text()
        const lines = csvText.trim().split("\n")
        const headers = lines[0].split(",").map((h) => h.trim())

        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",")
          const row = {}
          headers.forEach((header, index) => {
            const value = values[index]?.trim()
            row[header] = header === "epoch" ? parseInt(value) : parseFloat(value) || 0
          })
          return row
        })

        const variants = [
          {
            name: "YOLOv8n",
            data: parsedData,
            description: "Nano model - fastest inference",
          },
          {
            name: "YOLOv8s",
            data: parsedData.map(item => ({
              ...item,
              "metrics/mAP50(B)": Math.min(1, item["metrics/mAP50(B)"] * 1.05),
            })),
            description: "Small model - balanced speed and accuracy",
          }
        ]

        setModels(variants)
        setSelectedModel("YOLOv8n")
      } catch (error) {
        console.error("Failed to load YOLO metrics", error)
      }
    }

    fetchData()
  }, [])

  const currentModel = models.find((m) => m.name === selectedModel)
  const currentData = currentModel?.data || []
  const lastEpoch = currentData[currentData.length - 1] || {}
  const data = currentModel?.data || []

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
        fontSize: "12px",
      }
    }
  }

  const MetricChart = ({ title, dataKey, color, domain }) => (
    <div className="bg-transparent">
      <h3 className="text-white text-sm font-medium mb-1 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} {...chartConfig}>
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
          <ChartLine className="h-8 w-8 text-white"/>
          <h2 className="text-2xl text-white">Results on Balanced Dataset</h2>
        </div>

        {/* Model Selector with Custom Styling */}
        <div className="flex items-center gap-4 mb-6">
          <Label htmlFor="model-select" className="text-white/80">
            Select Model:
          </Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[300px] bg-[#2a3158] border-white/20 text-white cursor-pointer">
              <SelectValue placeholder="Choose a YOLO model"/>
            </SelectTrigger>
            <SelectContent className="border-white/20 bg-[#2a3158]">
              {models.map((m) => (
                  <SelectItem key={m.name} value={m.name} className="text-white focus:bg-[#161b36]">
                    {m.name}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Training Losses */}
        <h2 className="text-white text-xl font-semibold mb-6">Training Losses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricChart title="train/box_loss" dataKey="train/box_loss" color="#ef4444"/>
          <MetricChart title="train/cls_loss" dataKey="train/cls_loss" color="#f97316"/>
          <MetricChart title="train/dfl_loss" dataKey="train/dfl_loss" color="#eab308"/>
        </div>

        {/* Validation Losses */}
        <h2 className="text-white text-xl font-semibold mb-6">Validation Losses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricChart title="val/box_loss" dataKey="val/box_loss" color="#dc2626"/>
          <MetricChart title="val/cls_loss" dataKey="val/cls_loss" color="#ea580c"/>
          <MetricChart title="val/dfl_loss" dataKey="val/dfl_loss" color="#ca8a04"/>
        </div>

        {/* Performance Metrics */}
        <h2 className="text-white text-xl font-semibold mb-6">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricChart title="Precision" dataKey="metrics/precision(B)" color="#22c55e" domain={[0, 1]}/>
          <MetricChart title="Recall" dataKey="metrics/recall(B)" color="#3b82f6" domain={[0, 1]}/>
          <MetricChart title="mAP50" dataKey="metrics/mAP50(B)" color="#8b5cf6" domain={[0, 1]}/>
          <MetricChart title="mAP50-95" dataKey="metrics/mAP50-95(B)" color="#ec4899" domain={[0, 1]}/>
        </div>

        {/* Summary Stats */}
        <div className="bg-[#2a3158] p-6 rounded-lg">
          <h2 className="text-white text-xl font-semibold mb-4">Training Summary - {selectedModel}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-gray-400 text-sm">Total Epochs</div>
              <div className="text-white text-2xl font-bold">{currentData.length}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Final mAP50</div>
              <div className="text-green-400 text-2xl font-bold">
                {(lastEpoch["metrics/mAP50(B)"] * 100).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Final Precision</div>
              <div className="text-blue-400 text-2xl font-bold">
                {(lastEpoch["metrics/precision(B)"] * 100).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Final Recall</div>
              <div className="text-purple-400 text-2xl font-bold">
                {(lastEpoch["metrics/recall(B)"] * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
