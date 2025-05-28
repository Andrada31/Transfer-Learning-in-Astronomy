"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function YoloMetricsDashboard() {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Define the model configurations with Google Drive URLs
  const modelConfigs = [
    {
      name: "YOLO11n",
      path: "https://drive.google.com/file/d/16Y_p6YYs5tSdFEzZzBPKs0rz5uhpB3oI/view?usp=sharing",
      description: "YOLO11 Nano model - latest architecture"
    },
    {
      name: "YOLOv8",
      path: "https://drive.google.com/file/d/1l3-XJg4GvRK_hGmlpIJJRB-Zkdg-6Wyz/view?usp=sharing",
      description: "YOLOv8 model - proven performance"
    }
  ]

  const parseCSV = (csvText) => {
    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",").map(h => h.trim())

    return lines.slice(1).map(line => {
      const values = line.split(",")
      const row = {}
      headers.forEach((header, index) => {
        const value = values[index]?.trim()
        row[header] = header === "epoch" ? parseInt(value) : parseFloat(value) || 0
      })
      return row
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const modelData = await Promise.all(
          modelConfigs.map(async (config) => {
            try {
              const response = await fetch(config.path)
              if (!response.ok) {
                throw new Error(`Failed to fetch ${config.name}: ${response.status}`)
              }
              const csvText = await response.text()
              const parsedData = parseCSV(csvText)

              // Debug: Log the first few rows and headers
              console.log(`${config.name} CSV Headers:`, Object.keys(parsedData[0] || {}))
              console.log(`${config.name} First Row:`, parsedData[0])
              console.log(`${config.name} Data Length:`, parsedData.length)

              return {
                name: config.name,
                data: parsedData,
                description: config.description,
                loaded: true
              }
            } catch (err) {
              console.error(`Error loading ${config.name}:`, err)
              return {
                name: config.name,
                data: [],
                description: config.description,
                loaded: false,
                error: err.message
              }
            }
          })
        )

        // Filter out models that failed to load
        const successfullyLoaded = modelData.filter(model => model.loaded)

        if (successfullyLoaded.length === 0) {
          throw new Error("No models could be loaded successfully")
        }

        setModels(modelData)
        setSelectedModel(successfullyLoaded[0].name)
      } catch (error) {
        console.error("Failed to load YOLO metrics", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
              Expand
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
                    <YAxis stroke="#fff" tick={{ fill: "#fff" }} domain={domain || ["dataMin", "dataMax"]}  />
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

  if (loading) {
    return (
      <div className="w-full min-h-screen px-0 py-10 bg-[#0b0b11] flex items-center justify-center">
        <div className="text-white text-xl">Loading YOLO metrics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full min-h-screen px-0 py-10 bg-[#0b0b11] flex items-center justify-center">
        <div className="text-red-400 text-xl text-center">
          <div>Error loading data:</div>
          <div className="text-sm mt-2">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen px-0 py-10 bg-[#0b0b11]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 my-8">
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
                <SelectItem
                  key={m.name}
                  value={m.name}
                  className="text-white focus:bg-[#161b36]"
                  disabled={!m.loaded}
                >
                  <div className="flex flex-col">
                    <span>{m.name}</span>
                    {!m.loaded && <span className="text-xs text-red-400">Failed to load</span>}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {currentModel && (
            <div className="text-white/60 text-sm">
              {currentModel.description}
              {!currentModel.loaded && (
                <span className="text-red-400 ml-2">Failed to load</span>
              )}
            </div>
          )}
        </div>

        {currentModel?.loaded ? (
          <>
            {/* Debug Section - Remove this after fixing */}
            <div className="border border-yellow-500/50 p-4 rounded-lg bg-yellow-900/20 mb-6">
              <h3 className="text-yellow-300 text-lg mb-2">Debug Info for {selectedModel}</h3>
              <div className="text-white/80 text-sm">
                <div><strong>Available Columns:</strong></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {Object.keys(currentData[0] || {}).map(col => (
                    <div key={col} className="bg-gray-800 p-1 rounded text-xs">{col}</div>
                  ))}
                </div>
                <div className="mt-2"><strong>Total Rows:</strong> {currentData.length}</div>
                <div><strong>Sample Data:</strong></div>
                <pre className="text-xs mt-1 bg-gray-900 p-2 rounded overflow-x-auto">
                  {JSON.stringify(currentData[0] || {}, null, 2)}
                </pre>
              </div>
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

            <div className="border border-white/20 p-6 rounded-lg bg-[#17173a]">
              <h2 className="text-white text-xl mb-4">Final RESULTS - {selectedModel}</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div><div className="text-gray-400 text-sm">Total Epochs</div><div className="text-blue-300 text-2xl font-bold">{currentData.length}</div></div>
                <div><div className="text-gray-400 text-sm">Final Precision</div><div className="text-blue-300 text-2xl font-bold">{(lastEpoch["metrics/precision(B)"] * 100).toFixed(1)}%</div></div>
                <div><div className="text-gray-400 text-sm">Final Recall</div><div className="text-blue-300 text-2xl font-bold">{(lastEpoch["metrics/recall(B)"] * 100).toFixed(1)}%</div></div>
                <div><div className="text-gray-400 text-sm">Final mAP@50</div><div className="text-blue-300 text-2xl font-bold">{(lastEpoch["metrics/mAP50(B)"] * 100).toFixed(1)}%</div></div>
                <div><div className="text-gray-400 text-sm">Final mAP@50:95</div><div className="text-blue-300 text-2xl font-bold">{(lastEpoch["metrics/mAP50-95(B)"] * 100).toFixed(1)}%</div></div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-white/60">
            <div>No valid data available for the selected model.</div>
            {currentModel?.error && (
              <div className="text-red-400 text-sm mt-2">Error: {currentModel.error}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}