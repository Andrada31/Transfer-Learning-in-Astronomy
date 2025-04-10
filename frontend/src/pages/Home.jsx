import React, { useState } from "react"
import "@/styles/App.css"
import Sidenavbar from "@/components/custom/sidenavbar"
import Tooltip from "@/components/custom/Tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FaTerminal as Terminal } from "react-icons/fa6"
import ModelSelector from "@/components/custom/ModelSelector"
import { ImageUploadPredict } from "@/components/custom/ImageUploadPredict"
import {ImageUploaderActivationMap} from "@/components/custom/ImageUploader_ActivationMap"
import { PredictionAnalyticsCard } from "@/components/custom/prediction-analytics-card"
import { HomeMetrics } from "@/components/custom/HomeMetrics"
import { X } from "lucide-react"
// import { heatmapData, imageSizes } from "@/data"

const Home = () => {
  const [activeTab, setActiveTab] = useState("resnet")
  const [imagePreview, setImagePreview] = useState(null)
  const [predictionsByModel, setPredictionsByModel] = useState({})

  const handleModelChange = (model) => {
    setActiveTab(model)
  }

  const handleImageChange = (url) => {
    setImagePreview(url)
    setPredictionsByModel({})
  }

  const handleAllPredictions = (update) => {
    if (typeof update === "function") {
      setPredictionsByModel((prev) => update(prev))
    } else {
      setPredictionsByModel((prev) => ({ ...prev, ...update }))
    }
  }

  const handleError = (err) => {
    console.error("Prediction error:", err)
    setPredictionsByModel({})
  }

  const handleRemove = () => {
    setImagePreview(null)
    setPredictionsByModel({})
  }

  const currentPrediction = predictionsByModel[activeTab] || null
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="flex flex-col">
      <Sidenavbar />
      <div className="pt-15 px-4 md:px-8">
        {showAlert && (
          <Alert className="relative pr-10">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Upload an image and analyze it with a deep learning model.
            </AlertDescription>
            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </Alert>
        )}

        <h1 className="text-3xl my-4">DSO CLASSIFICATION TOOL</h1>
        <ModelSelector onModelChange={handleModelChange} />
        {/*<ImageUploadPredict*/}
        {/*  selectedModel={activeTab}*/}
        {/*  onImageChange={handleImageChange}*/}
        {/*  onAllPredictions={handleAllPredictions}*/}
        {/*  onError={handleError}*/}
        {/*/>*/}
        <ImageUploaderActivationMap
          selectedModel={activeTab}
          onImageChange={handleImageChange}
          onAllPredictions={handleAllPredictions}
          onError={handleError}
        />

      </div>

      {imagePreview && currentPrediction && (
        <PredictionAnalyticsCard
          inputImageUrl={imagePreview}
          activationMapUrl={currentPrediction.activationMapUrl}
          predictedClass={currentPrediction.class}
          confidenceScore={currentPrediction.probability}
          topPredictions={currentPrediction.top_predictions || []}
          inferenceTime={currentPrediction.inference_time || 0}
          modelName={currentPrediction.model_name}
          inputSize={currentPrediction.input_size}
          datasetOrigin={currentPrediction.dataset_origin}
          modelParameters={currentPrediction.modelParameters}
          numLayers={currentPrediction.numLayers}
          flops={currentPrediction.flops}
          onRemove={handleRemove}
        />
      )}

      <HomeMetrics
        predictions={predictionsByModel}
      />
      <div className="hidden md:block">
        <Tooltip />
      </div>
    </div>
  )
}

export default Home
