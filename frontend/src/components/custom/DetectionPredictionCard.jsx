// components/custom/DetectionPredictionCard.jsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {ImageIcon, Layers, Variable, Clock, Cpu, Binary, ListChecks, Info, Database} from "lucide-react";

export function DetectionPredictionCard({
  inputImageUrl,
  detections = [],
  inferenceTime,
  modelName,
  inputSize,
  modelParameters,
  numLayers,
  flops,
  onRemove,
}) {
  return (
    <Card className="fixed right-4 top-4 bottom-4 w-[24rem] shadow-xl overflow-y-auto border-[#2A2C3F]">
      <CardHeader className="pb-2 border-b border-[#2A2C3F]">
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <ListChecks className="h-5 w-5 text-[#6c88da]" />
          Detection Results
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
                src={inputImageUrl}
                alt="Input preview"
                className="w-full h-auto object-cover aspect-square"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-800 text-gray-400">
                No image available
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Objects Detected</h3>
          <p className="text-white font-semibold text-xl">{detections.length}</p>

          <ul className="list-disc ml-6 text-sm text-gray-300">
            {detections.map((obj, index) => (
              <li key={index}>
                <span className="text-white font-medium">{obj.name || obj.class || "Object"}</span> - Confidence:{" "}
                <span className="text-[#7c9fff]">{(obj.confidence * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2 text-gray-300 pt-6">
            <Info className="h-4 w-4 text-[#85a6ff]"/>
            Model Information
          </h3>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-gray-500"/>
              <span className="text-gray-500">Model:</span>
            </div>
            <div className="font-medium text-gray-300">{modelName || "N/A"}</div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500"/>
              <span className="text-gray-500">Inference:</span>
            </div>
            <div className="font-medium text-gray-300">{inferenceTime?.toFixed(1)}ms</div>

            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gray-500"/>
              <span className="text-gray-500">Input Size:</span>
            </div>
            <div className="font-medium text-gray-300">{inputSize || "N/A"}</div>

            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-gray-500"/>
              <span className="text-gray-500">Dataset:</span>
            </div>
            <div className="font-medium text-gray-300">{"Negative Sampling" || "N/A"}</div>

            {numLayers && (
                <>
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-gray-500"/>
                    <span className="text-gray-500">Layers:</span>
                  </div>
                  <div className="font-medium text-gray-300">{numLayers}</div>
                </>
            )}

            {modelParameters && (
                <>
                  <div className="flex items-center gap-2">
                    <Variable className="h-4 w-4 text-gray-500"/>
                    <span className="text-gray-500">Parameters:</span>
                  </div>
                  <div className="font-medium text-gray-300">{modelParameters}</div>
                </>
            )}

            {flops && (
                <>
                  <div className="flex items-center gap-2">
                    <Binary className="h-4 w-4 text-gray-500"/>
                    <span className="text-gray-500">FLOPs:</span>
                  </div>
                  <div className="font-medium text-gray-300">{flops}</div>
                </>
            )}

          </div>
        </div>
      </CardContent>
    </Card>
  );
}
