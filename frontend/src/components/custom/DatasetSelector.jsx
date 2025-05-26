"use client"

import React, { useState } from "react"
import { Database, Zap, Scale } from "lucide-react"

const DatasetSelector = ({ onDatasetChange }) => {
  const datasets = {
    deepspace: {
      name: "DeepSpaceYoloDataset",
      shortName: "DeepSpace YOLO",
      icon: Database,
      description: "Original dataset",
    },
    augmented: {
      name: "Augmented DSYD",
      shortName: "Augmented",
      icon: Zap,
      description: "Enhanced with augmentation",
    },
    balanced: {
      name: "Balanced DSYD",
      shortName: "Balanced",
      icon: Scale,
      description: "Balanced class distribution",
    },
  }

  const [selectedDataset, setSelectedDataset] = useState("deepspace")

  const handleDatasetChange = (datasetKey) => {
    setSelectedDataset(datasetKey)
    if (onDatasetChange) {
      onDatasetChange(datasetKey, datasets[datasetKey])
    }
  }

  return (
    <div className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:w-[40vw] mt-4">
      <div className="backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="text-sm text-gray-300 mb-3 font-medium">Dataset Selector</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(datasets).map(([key, dataset]) => {
            const IconComponent = dataset.icon
            const isSelected = selectedDataset === key

            return (
              <button
                key={key}
                onClick={() => handleDatasetChange(key)}
                className={`relative p-3 rounded-lg border transition-all duration-200 text-left ${
                  isSelected
                    ? "bg-[#252960]/20 border-[#7c9fff]/50 text-white"
                    : "bg-gray-900/30 border-gray-600/30 text-gray-300 hover:bg-gray-600/40 hover:border-gray-500/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1.5 rounded-md flex-shrink-0 ${
                      isSelected ? "bg-[#7c9fff]/30" : "bg-gray-600/50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm leading-tight">{dataset.shortName}</div>
                    <div
                      className={`text-xs mt-1 leading-tight ${
                        isSelected ? "text-blue-200" : "text-gray-400"
                      }`}
                    >
                      {dataset.description}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-[#7c9fff] rounded-full"></div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-3 text-xs text-gray-400">
          Selected: <span className="text-gray-200">{datasets[selectedDataset].name}</span>
        </div>
      </div>
    </div>
  )
}

export default DatasetSelector
