"use client"

import { useEffect, useState } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LineChartIcon as ChartLine, Expand, Award } from 'lucide-react'

export function ClassificationMetrics({ modelName }) {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState("")

  useEffect(() => {
    async function loadModelData() {
      try {
        let module
        switch (modelName) {
          case "resnet50":
            module = await import("@/components/charts/results/resnet50.js")
            break
          case "efficientnetb0":
            module = await import("@/components/charts/results/efficientnetb0.js")
            break
          case "vgg16":
            module = await import("@/components/charts/results/vgg16.js")
            break
          default:
            throw new Error("Unknown model name")
        }

        let modelData, report, label

        if (modelName === "resnet50") {
          modelData = module.resnet50
          report = module.resnet50ClassificationReport
          label = "ResNet50"
        } else if (modelName === "efficientnetb0") {
          modelData = module.efficientnetb0
          report = module.efficientnetb0ClassificationReport
          label = "EfficientNetB0"
        } else if (modelName === "vgg16") {
          modelData = module.vgg16
          report = module.vgg16ClassificationReport
          label = "VGG16"
        } else {
          throw new Error("Unsupported model name")
        }

        const processedData = modelData.map(item => ({
          epoch: item.epoch,
          accuracy: item.trainingAccuracy,
          val_accuracy: item.validationAccuracy,
          loss: item.trainingLoss,
          val_loss: item.validationLoss,
        }))

        const bestVal = Math.max(...processedData.map(d => d.val_accuracy))
        const bestEpoch = processedData.find(d => d.val_accuracy === bestVal)?.epoch || 0

        const classificationReport = report.classes.map(item => ({
          class: item.label,
          precision: item.precision,
          recall: item.recall,
          f1_score: item.f1Score,
          support: item.support,
        }))

        const modelObj = {
          name: label,
          data: processedData,
          description: `Performance metrics for ${label}`,
          best_epoch: bestEpoch,
          best_val_accuracy: bestVal,
          classification_report: classificationReport,
          overall_accuracy: report.accuracy,
          macro_avg: {
            precision: report.macroAvg.precision,
            recall: report.macroAvg.recall,
            f1_score: report.macroAvg.f1Score,
          },
          weighted_avg: {
            precision: report.weightedAvg.precision,
            recall: report.weightedAvg.recall,
            f1_score: report.weightedAvg.f1Score,
          },
        }

        setModels([modelObj])
        setSelectedModel(label)

      } catch (err) {
        console.error("Failed to load model data:", err)
      }
    }

    loadModelData()
  }, [modelName])

  const currentModel = models.find((m) => m.name === selectedModel)
  const currentData = currentModel?.data || []
  const bestEpoch = currentModel?.best_epoch || 0
  const bestValAccuracy = currentModel?.best_val_accuracy || 0
  const classificationReport = currentModel?.classification_report || []

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
      },
    },
  }

  const classColors = ["#6c88da", "#4ade80", "#f59e0b", "#ef4444"]

  const radarData = classificationReport.map((item) => ({
    class: item.class,
    precision: item.precision * 100,
    recall: item.recall * 100,
    f1_score: item.f1_score * 100,
  }))

  const MetricChart = ({ title, dataKeys, colors, domain, percentage = false }) => (
    <div className="bg-transparent relative group">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-white text-sm font-medium text-center flex-1">{title}</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 text-white/60 hover:text-white hover:bg-white/10"
            >
              <Expand className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl sm:max-w-4xl bg-black border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                {title} - {selectedModel}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      dataKey="epoch"
                      stroke="#fff"
                      tick={{ fill: "#fff" }}
                      label={{
                        value: "Epoch",
                        position: "insideBottom",
                        offset: -10,
                        style: { textAnchor: "middle", fill: "#fff" },
                      }}
                    />
                    <YAxis
                      stroke="#fff"
                      tick={{ fill: "#fff" }}
                      domain={domain || ["dataMin", "dataMax"]}
                      tickFormatter={percentage ? (value) => `${(value * 100).toFixed(0)}%` : undefined}

                    />
                    <Tooltip
                      formatter={(value) => (percentage ? `${(value * 100).toFixed(2)}%` : value.toFixed(4))}
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "4px",
                        color: "#fff",
                      }}
                    />
                    {dataKeys.map((dataKey, index) => (
                      <Line
                        key={dataKey}
                        type="monotone"
                        dataKey={dataKey}
                        name={
                          dataKey.includes("val_") ? `Validation ${dataKey.replace("val_", "")}` : `Training ${dataKey}`
                        }
                        stroke={colors[index]}
                        strokeWidth={3}
                        dot={{ fill: colors[index], strokeWidth: 0, r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                {dataKeys.map((dataKey, index) => (
                  <div key={dataKey} className="p-3 bg-gray-900/50 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">
                      {dataKey.includes("val_") ? "Validation" : "Training"} {dataKey.replace("val_", "")}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="text-gray-400 text-xs">Initial</div>
                        <div className="text-white text-sm font-bold">
                          {percentage
                            ? `${(currentData[0]?.[dataKey] * 100).toFixed(1)}%`
                            : currentData[0]?.[dataKey].toFixed(4)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs">Final</div>
                        <div className="text-white text-sm font-bold">
                          {percentage
                            ? `${(currentData[currentData.length - 1]?.[dataKey] * 100).toFixed(1)}%`
                            : currentData[currentData.length - 1]?.[dataKey].toFixed(4)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs">Best</div>
                        <div className="text-white text-sm font-bold">
                          {percentage
                            ? `${(Math.max(...currentData.map((d) => d[dataKey])) * 100).toFixed(1)}%`
                            : Math.min(...currentData.map((d) => d[dataKey])).toFixed(4)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={currentData} {...chartConfig}>
          <CartesianGrid {...chartConfig.grid} />
          <XAxis dataKey="epoch" {...chartConfig.axes} />
          <YAxis
            {...chartConfig.axes}
            domain={domain || ["dataMin", "dataMax"]}
            tickFormatter={percentage ? (value) => `${(value * 100).toFixed(0)}%` : undefined}
          />
          <Tooltip
            formatter={(value) => (percentage ? `${(value * 100).toFixed(2)}%` : value.toFixed(4))}
            {...chartConfig.tooltip}
          />
          {dataKeys.map((dataKey, index) => (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              stroke={colors[index]}
              strokeWidth={2}
              dot={{ r: 1 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )

  const RadarChartComponent = () => (
    <div className="bg-transparent relative group">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-white text-sm font-medium text-center flex-1">Performance Radar</h3>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="class" tick={{ fill: "#fff", fontSize: 10 }} />
          <PolarRadiusAxis
            angle={90}
            domain={[80, 100]}
            tick={{ fill: "#fff", fontSize: 8 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Radar name="Precision" dataKey="precision" stroke="#6c88da" fill="#6c88da" fillOpacity={0.1} />
          <Radar name="Recall" dataKey="recall" stroke="#4ade80" fill="#4ade80" fillOpacity={0.1} />
          <Radar name="F1-Score" dataKey="f1_score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
          <Tooltip
            formatter={(value) => `${value.toFixed(1)}%`}
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "12px",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )


  // Metric cards component
  const MetricCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {classificationReport.map((classData, index) => (
        <div key={classData.class} className="bg-gray-900/30 rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: classColors[index] }} />
            <h4 className="text-white text-sm font-medium capitalize">{classData.class}</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Precision</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6c88da] rounded-full"
                    style={{ width: `${classData.precision * 100}%` }}
                  />
                </div>
                <span className="text-white text-xs font-medium">{(classData.precision * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Recall</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4ade80] rounded-full" style={{ width: `${classData.recall * 100}%` }} />
                </div>
                <span className="text-white text-xs font-medium">{(classData.recall * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">F1-Score</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: `${classData.f1_score * 100}%` }} />
                </div>
                <span className="text-white text-xs font-medium">{(classData.f1_score * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="pt-1 border-t border-white/10">
              <span className="text-gray-400 text-xs">Support: </span>
              <span className="text-white text-xs font-medium">{classData.support}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="w-full min-h-screen px-0 pb-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 my-8">
          <ChartLine className="h-8 w-8 text-white"/>
          <h2 className="text-2xl text-white">Experimental Results</h2>
        </div>

        {/* Best Model Performance */}
        <div
            className="mb-8 bg-gradient-to-r from-[#2a3158]/50 to-[#1a1f36]/50 p-6 rounded-lg border border-[#6c88da]/20">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-6 w-6 text-[#6c88da]"/>
            <h2 className="text-white text-xl font-semibold">Best Model Performance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-gray-400  text-sm">Overall Test Accuracy</div>
              <div className="text-[#6c88da] text-3xl font-bold">{(currentModel?.overall_accuracy * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm">Best Validation Accuracy</div>
              <div className="text-white  text-3xl font-bold">{(bestValAccuracy * 100).toFixed(2)}%</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm">Best Epoch</div>
              <div className="text-white text-3xl font-bold">{bestEpoch}</div>
            </div>

          </div>
        </div>

        {/* Training Metrics */}
        <h2 className="text-white text-xl font-semibold mb-6 ">Training Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 ">
          <MetricChart
              title="Model Accuracy"
              dataKeys={["accuracy", "val_accuracy"]}
              colors={["#6c88da", "orange"]}
              domain={[0, 1]}
              percentage={true}
          />
          <MetricChart title="Model Loss" dataKeys={["loss", "val_loss"]} colors={["#6c88da", "orange"]}/>
        </div>

        {/* Advanced Visualizations */}
        <div className="mb-8">
          <h3 className="text-white text-xl font-medium mb-4">Class-wise Performance</h3>
          <RadarChartComponent/>
        </div>


        {/* Metric Cards */}
        <div className="mb-8">

          <MetricCards/>
        </div>

        {/* Summary Stats */}
        <div className="border border-white/20 p-6 rounded-lg bg-gradient-to-r from-[#2a3158]/50 to-[#1a1f36]/50">
          <h2 className="text-white text-xl font-semibold mb-4">Evaluation Summary - {selectedModel}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">

            <div>
              <div className="text-gray-400 text-sm">Total Epochs</div>
              <div className="text-white text-2xl font-bold">{currentData.length}</div>
            </div>

            <div className="text-center">
              <div className="text-gray-400 text-sm">Test Accuracy</div>
              <div className="text-blue-400 text-2xl font-bold">
                {(currentModel?.overall_accuracy * 100).toFixed(1)}%
              </div>
            </div>

            <div>
              <div className="text-gray-400 text-sm">Initial Val Acc</div>
              <div className="text-white text-2xl font-bold">
                {(currentData[0]?.val_accuracy * 100).toFixed(1)}%
              </div>
            </div>

            <div>
              <div className="text-gray-400 text-sm">Final Val Acc</div>
              <div className="text-white text-2xl font-bold">
                {(currentData[currentData.length - 1]?.val_accuracy * 100).toFixed(1)}%
              </div>
            </div>

            <div>
              <div className="text-gray-400 text-sm">Validation Gain</div>
              <div className="text-green-400 text-2xl font-bold">
                {((currentData[currentData.length - 1]?.val_accuracy - currentData[0]?.val_accuracy) * 100).toFixed(1)}%
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassificationMetrics
