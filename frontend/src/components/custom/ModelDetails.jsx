"use client"

import { useLocation } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { resnetModels } from "@/lib/resnetData"
import { vggModels } from "@/lib/vggData"
import { efficientNetModels } from "@/lib/efficientNetData"

export default function ModelDetails({ defaultModel }) {
  const location = useLocation()
  const path = location.pathname.toLowerCase()

  let models
  if (path.includes("resnet")) models = resnetModels
  else if (path.includes("vgg")) models = vggModels
  else if (path.includes("efficientnet")) models = efficientNetModels
  else models = {}

  if (!models || Object.keys(models).length === 0) {
    return <p className="text-center text-white">No model data available for this route.</p>
  }

  const [activeTab, setActiveTab] = useState("overview")
  const [selectedModel, setSelectedModel] = useState(defaultModel || Object.keys(models)[0])

  const modelData = models[selectedModel]

  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#1e2545]/20 border-[#2a3158] text-white">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-3xl text-white">{modelData.modelName}</CardTitle>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full sm:w-[180px] bg-[#2a3158] border-[#3a4168] text-white">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a3158] border-[#3a4168] text-white">
              {Object.keys(models).map((modelKey) => (
                <SelectItem key={modelKey} value={modelKey} className="focus:bg-[#161b36] focus:text-white">
                  {models[modelKey].modelName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Separator className="mt-2 bg-[#2a3158]" />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#2a3158]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#161b36] hover:bg-white hover:text-black data-[state=active]:text-white cursor-pointer">
              Overview
            </TabsTrigger>
            <TabsTrigger value="architecture" className="data-[state=active]:bg-[#161b36] hover:bg-white hover:text-black data-[state=active]:text-white cursor-pointer">
              Architecture
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-[#161b36] hover:bg-white hover:text-black data-[state=active]:text-white cursor-pointer">
              Training & Evaluation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-4">
            <div className="space-y-4">
              <p className="text-gray-300">{modelData.overviewData.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Published</h3>
                  <p>{modelData.overviewData.yearPublished}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Authors</h3>
                  <p>{modelData.overviewData.authors.join(", ")}</p>
                </div>
              </div>
              {modelData.overviewData.paperLink && (
                <div className="pt-2">
                  <a
                    href={modelData.overviewData.paperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                  >
                    View Original Paper
                  </a>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-300">Layers</h3>
                <p className="text-2xl font-bold">{modelData.architectureData.layers}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300">Parameters</h3>
                <p className="text-2xl font-bold">{modelData.architectureData.parameters}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300">Input Size</h3>
                <p>{modelData.architectureData.inputSize}</p>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {modelData.architectureData.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="training" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-300">Dataset</h3>
                <p>{modelData.trainingData.dataset}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300">Top Accuracy</h3>
                <p className="text-2xl font-bold">{modelData.trainingData.accuracy}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300">Training Time</h3>
                <p>{modelData.trainingData.trainingTime}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300">Hardware</h3>
                <p>{modelData.trainingData.hardware}</p>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Evaluation Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(modelData.trainingData.evaluationMetrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-[#2a3158] pb-1">
                    <span>{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}