"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, Sparkles } from "lucide-react"
import { uploadImage, predictImage } from "@/services/api"

const ALLOWED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const MODEL_NAMES = ["resnet", "efficientnet", "vgg"]

export function ImageUploadPredict({
  selectedModel,
  onAllPredictions,
  onError,
  onImageChange,
}) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [predictionsByModel, setPredictionsByModel] = useState({})
  const [showActivationMap, setShowActivationMap] = useState(false)


  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Handle file upload
  const handleUpload = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError("Invalid file format. Please upload a JPG, JPEG, PNG, or WebP image.")
        return
      }
      setError(null)
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      onImageChange?.(previewUrl)

      try {
        const response = await uploadImage(file)
        setSelectedImage(response.data.image)
      } catch (err) {
        console.error("Upload Error:", err)
        setError("Image upload failed. Please try again.")
        onError?.("Image upload failed.")
      }
    }
  }, [onError, onImageChange])

  // API call to run inference with a given model
  const runPredictionForModel = async (modelName, base64Image) => {
    try {
      const response = await predictImage(base64Image, modelName)
      return response.data
    } catch (e) {
      console.error(`Prediction error for ${modelName}:`, e)
      throw e
    }
  }

  // Predict with the selected model and all others in parallel
  const handlePredict = async () => {
    if (!selectedImage) return
    setLoading(true)
    setError(null)

    try {
      // 1) Predict with the currently selected model
      const mainResult = await runPredictionForModel(selectedModel, selectedImage)

      // 2) Predict with the other models in parallel
      const otherModels = MODEL_NAMES.filter((m) => m !== selectedModel)
      const results = await Promise.all(
        otherModels.map(async (modelName) => {
          const result = await runPredictionForModel(modelName, selectedImage)
          return [modelName, result]
        })
      )

      // 3) Merge everything into a single object
      const newPredictions = { [selectedModel]: mainResult }
      for (const [modelName, result] of results) {
        newPredictions[modelName] = result
      }

      // 4) Update local state once
      setPredictionsByModel(newPredictions)

      // 5) Update parent state once
      onAllPredictions?.((prev) => ({
        ...prev,
        ...newPredictions,
      }))
    } catch (err) {
      const message = err?.response?.data?.error || "Prediction failed"
      setError(message)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }

  // Remove the selected image and reset
  const handleRemove = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setPredictionsByModel({})
    setError(null)
    onImageChange?.(null)
    const fileInput = document.getElementById("file-upload")
    if (fileInput) {
      fileInput.value = ""
    }
  }

  // Handle drag-and-drop
  const onDrop = useCallback(
    (acceptedFiles) => handleUpload({ target: { files: acceptedFiles } }),
    [handleUpload]
  )

  return (
    <div className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <p className="my-3 text-sm text-gray-600 flex items-center justify-center">
          Allowed formats: JPG, JPEG, PNG, WebP
        </p>

        <Input
          key={selectedImage ? "uploaded" : "not-uploaded"}
          type="file"
          onChange={handleUpload}
          accept={ALLOWED_FORMATS.join(",")}
          className="hidden"
          id="file-upload"
        />

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!imagePreview ? (
          // Dropzone / placeholder
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-20 text-center cursor-pointer flex items-center justify-center"
            onDrop={(e) => {
              e.preventDefault()
              onDrop(Array.from(e.dataTransfer.files))
            }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("file-upload").click()}
          >
            <div>
              <Upload className="mx-auto h-24 w-12 text-gray-300" />
              <p className="text-gray-300 text-[14px]">
                Click or drag and drop an image here
              </p>
            </div>
          </div>
        ) : (
          // Preview + remove button
            <div className="mt-4 relative flex justify-center items-center">
              <img
                  src={
                    showActivationMap && predictionsByModel[selectedModel]?.activationMapUrl
                        ? predictionsByModel[selectedModel].activationMapUrl
                        : imagePreview
                  }
                  alt="Selected"
                  className="max-w-full max-h-[90vh] object-scale-down rounded-lg"
              />

              <Button
                  onClick={handleRemove}
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-[#24275b]/50 hover:bg-opacity-100"
              >
                <X className="h-4 w-4"/>
              </Button>
              {/*{predictionsByModel[selectedModel]?.activationMapUrl && (*/}
              {/*  <button*/}
              {/*    onClick={() => setShowActivationMap(!showActivationMap)}*/}
              {/*    className="absolute bottom-2 right-2 bg-[#1E1F2E]/90 text-xs px-2 py-1*/}
              {/*               rounded-md backdrop-blur-sm text-white hover:bg-[#6c88da]/90*/}
              {/*               transition-colors cursor-pointer"*/}
              {/*  >*/}
              {/*    {showActivationMap ? "Show Original" : "Show Activation Map"}*/}
              {/*  </button>*/}
              {/*)}*/}
            </div>
        )}

        <div className="my-4 mb-4 flex gap-2">
          <Button
              onClick={() => document.getElementById("file-upload").click()}
              variant="outline"
              className="flex-1"
          >
            <Upload className="mr-2 h-4 w-4" /> Choose File
          </Button>
          <Button
            onClick={handlePredict}
            className="flex-1 text-gray-300 hover:bg-[#6c88da]"
            variant="default"
            disabled={!selectedImage || loading}
          >
            <Sparkles className="h-4 w-4 text-gray-300 hover:text-gray-900" />
            {loading ? "Predicting..." : "Predict"}
          </Button>
        </div>
      </CardContent>
    </div>
  )
}
