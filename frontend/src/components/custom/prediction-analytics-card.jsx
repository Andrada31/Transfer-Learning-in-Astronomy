"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Clock, Cpu, Database, ImageIcon, BarChart3, Info, Layers, Variable, Binary } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/services/use-mobile"

export function PredictionAnalyticsCard({
  inputImageUrl,
  activationMapUrl,
  predictedClass,
  confidenceScore,
  topPredictions = [],
  inferenceTime,
  modelName,
  inputSize,
  datasetOrigin,
  modelParameters,
  flops,
  numLayers,
  onRemove,
  className,
}) {
  const isMobile = useIsMobile()
  const [showActivationMap, setShowActivationMap] = useState(false)

  const formatConfidence = (value) => {
    if (typeof value !== "number" || isNaN(value)) {
      return "0.0%"
    }
    return `${(value * 100).toFixed(1)}%`
  }

  const toPercentValue = (value) => {
    if (typeof value !== "number" || isNaN(value)) {
      return 0
    }
    return value * 100
  }

  return (
    <Card
      className={cn(
        "border-[#2A2C3F] shadow-xl",
        isMobile ? "w-full mt-4" : "fixed right-4 top-4 bottom-4 w-100 overflow-y-auto",
        className
      )}
    >
      <CardHeader className="pb-2 border-b border-[#2A2C3F]">
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <BarChart3 className="h-5 w-5 text-[#6c88da]" />
          Prediction Analysis
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2 text-gray-300">
            <ImageIcon className="h-4 w-4 text-[#6c88da]" />
            Input Image
          </h3>

          <div className="relative rounded-md overflow-hidden border border-[#2A2C3F]">
            {inputImageUrl ? (
              <img
                src={showActivationMap && activationMapUrl ? activationMapUrl : inputImageUrl}
                alt="Input preview"
                className="w-full h-auto object-cover aspect-square"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-800 text-gray-400">
                No image available
              </div>
            )}

            {activationMapUrl && (
              <button
                onClick={() => setShowActivationMap(!showActivationMap)}
                className="absolute bottom-2 right-2 bg-[#1E1F2E]/90 text-xs px-2 py-1 rounded-md backdrop-blur-sm text-white hover:bg-[#6c88da]/90 transition-colors cursor-pointer"
              >
                {showActivationMap ? "Show Original" : "Show Activation Map"}
              </button>
            )}
          </div>
        </div>

        <Separator className="bg-[#2A2C3F]" />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-300">Predicted Class</h3>
            <div className="text-xl font-bold text-white">{predictedClass || "N/A"}</div>

            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Confidence</span>
                <span className="font-medium text-[#7c9fff]">
                  {formatConfidence(confidenceScore)}
                </span>
              </div>
              <Progress
                value={toPercentValue(confidenceScore)}
                className="h-2 bg-[#2A2C3F]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-300">Top Predictions</h3>
            <div className="space-y-2">
              {topPredictions.map((prediction, index) => {
                const probability = prediction.probability
                const label = prediction.class || "Unknown"

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{label}</span>
                      <span className="font-medium text-[#7c9fff]">
                        {formatConfidence(probability)}
                      </span>
                    </div>
                    <Progress
                      value={toPercentValue(probability)}
                      className="h-1.5 bg-[#2A2C3F]"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <Separator className="bg-[#2A2C3F]" />
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2 text-gray-300">
            <Info className="h-4 w-4 text-[#85a6ff]" />
            Model Information
          </h3>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Model:</span>
            </div>
            <div className="font-medium text-gray-300">{modelName || "N/A"}</div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Inference:</span>
            </div>
            <div className="font-medium text-gray-300">
              {typeof inferenceTime === "number" ? inferenceTime.toFixed(1) : "N/A"}ms
            </div>

            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Input Size:</span>
            </div>
            <div className="font-medium text-gray-300">{inputSize || "N/A"}</div>

            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500">Dataset:</span>
            </div>
            <div className="font-medium text-gray-300">{datasetOrigin || "N/A"}</div>

            {numLayers && (
              <>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">Layers:</span>
                </div>
                <div className="font-medium text-gray-300">{numLayers}</div>
              </>
            )}

            {modelParameters && (
              <>
                <div className="flex items-center gap-2">
                  <Variable className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">Parameters:</span>
                </div>
                <div className="font-medium text-gray-300">{modelParameters}</div>
              </>
            )}

            {flops && (
              <>
                <div className="flex items-center gap-2">
                  <Binary className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">FLOPs:</span>
                </div>
                <div className="font-medium text-gray-300">{flops}</div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
