"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X } from "lucide-react"
import { uploadImage, predictImage } from "@/services/api"

const ALLOWED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export function ImageUploadPredict({ selectedModel, onPrediction, onError }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [error, setError] = useState(null)

  const handleUpload = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError("Invalid file format. Please upload a JPG, JPEG, PNG, or WebP image.")
        return
      }
      setError(null)
      setImagePreview(URL.createObjectURL(file))
      const response = await uploadImage(file)
      setSelectedImage(response.data.image)
    }
  }, [])

  const handlePredict = async () => {
    if (selectedImage) {
      console.log("Sending to backend:", { image: selectedImage, model: selectedModel });

      try {
        const response = await predictImage(selectedImage, selectedModel);
        console.log("Response:", response.data);
        setPrediction(response.data);
        setError(null);
        onPrediction && onPrediction(response.data);
      } catch (err) {
        const message = err?.response?.data?.error || "Prediction failed";
        console.error("Prediction Error:", message);
        setError(message);
        onError && onError(message);
      }
    }
  }

  const handleRemove = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setPrediction(null)
    setError(null)
    const fileInput = document.getElementById("file-upload")
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      handleUpload({ target: { files: acceptedFiles } })
    },
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
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer flex items-center justify-center"
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
            <img src={imagePreview} alt="Selected" className="max-w-full max-h-[90vh] object-scale-down rounded-lg" />
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
          <Button onClick={() => document.getElementById("file-upload").click()} variant="outline" className="flex-1">
            <Upload className="mr-2 h-4 w-4" /> Choose File
          </Button>
          <Button onClick={handlePredict} className="flex-1" disabled={!selectedImage}>
            Predict &gt;&gt;
          </Button>
        </div>

        {prediction && prediction.top_predictions && (
          <div className="relative w-full rounded-lg border border-white/80 bg-transparent px-4 py-3 text-sm text-foreground shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Top 3 Predictions</h3>
            {prediction.top_predictions.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 border-b border-white/30">
                <span className="text-white/80">{item.class}</span>
                <span className="text-white font-semibold">{(item.probability * 100).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </div>
  )
}
