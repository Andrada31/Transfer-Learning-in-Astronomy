"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function ImageUpload() {
  const [image, setImage] = useState(null)
  const [status, setStatus] = useState("idle")

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result)
      }
      reader.readAsDataURL(file)
      handleUpload(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  })

  const handleUpload = async (file) => {
    setStatus("uploading")
    // Simulating upload process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // In a real scenario, you would upload the file to your server or a storage service here
    // If successful:
    setStatus("success")
    // If error:
    // setStatus('error')
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary",
        )}
      >
        <input {...getInputProps()} />
        {image ? (
          <img src={image || "/placeholder.svg"} alt="Uploaded preview" className="max-h-48 mx-auto mb-4" />
        ) : (
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
        )}
        <p className="text-sm text-gray-600">
          {isDragActive ? "Drop the image here" : "Drag 'n' drop an image here, or click to select one"}
        </p>
      </div>
      <div className="mt-4 text-center">
        {status === "uploading" && <p className="text-blue-500">Uploading...</p>}
        {status === "success" && (
          <p className="text-green-500 flex items-center justify-center">
            <Check className="mr-2" /> Upload successful
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 flex items-center justify-center">
            <AlertCircle className="mr-2" /> Upload failed
          </p>
        )}
      </div>
      <Button
        onClick={() => {
          setImage(null)
          setStatus("idle")
        }}
        variant="outline"
        className="mt-4 w-full"
      >
        Clear
      </Button>
    </div>
  )
}

export default ImageUpload;