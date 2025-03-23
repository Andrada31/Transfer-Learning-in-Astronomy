"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X } from "lucide-react"
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

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

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

  const runPredictionForModel = async (modelName, base64Image) => {
    try {
      const response = await predictImage(base64Image, modelName)
      return response.data
    } catch (e) {
      console.error(`Prediction error for ${modelName}:`, e)
      throw e
    }
  }

  const handlePredict = async () => {
    if (!selectedImage) return
    setLoading(true)
    setError(null)

    let mainResult
    try {
      mainResult = await runPredictionForModel(selectedModel, selectedImage)
      setPredictionsByModel((prev) => ({ ...prev, [selectedModel]: mainResult }))
      onAllPredictions?.((prev) => ({ ...prev, [selectedModel]: mainResult }))
    } catch (err) {
      const message = err?.response?.data?.error || "Prediction failed"
      setError(message)
      setLoading(false)
      onError?.(message)
      return
    }

    //Fire off the other models in background
    const otherModels = MODEL_NAMES.filter((m) => m !== selectedModel)
    otherModels.forEach(async (model) => {
      try {
        const result = await runPredictionForModel(model, selectedImage)
        setPredictionsByModel((prev) => {
          const updated = { ...prev, [model]: result }
          onAllPredictions?.(updated)
          return updated
        })
      } catch (bgErr) {
        console.error(`Error in background for ${model}:`, bgErr)
      }
    })
    setLoading(false)
  }

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
              <p className="text-gray-300 text-[14px]">Click or drag and drop an image here</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 relative flex justify-center items-center">
            <img
              src={imagePreview}
              alt="Selected"
              className="max-w-full max-h-[90vh] object-scale-down rounded-lg"
            />
            <Button
              onClick={handleRemove}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="my-4 mb-10 flex gap-2">
          <Button
            onClick={() => document.getElementById("file-upload").click()}
            variant="outline"
            className="flex-1"
          >
            <Upload className="mr-2 h-4 w-4" /> Choose File
          </Button>
          <Button onClick={handlePredict} className="flex-1" disabled={!selectedImage || loading}>
            {loading ? "Predicting..." : "Predict >>"}
          </Button>
        </div>
      </CardContent>
    </div>
  )
}
