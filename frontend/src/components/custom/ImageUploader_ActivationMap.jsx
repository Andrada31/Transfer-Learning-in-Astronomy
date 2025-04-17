"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Upload, X, Sparkles, Map, BrainCircuit} from "lucide-react";
import { uploadImage, predictImage } from "@/services/api";
import ActivationMapViewer from "@/components/custom/ActivationMapViewer";

const ALLOWED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MODEL_NAMES = ["resnet", "efficientnet", "vgg"];

export function ImageUploaderActivationMap({
  selectedModel,
  onAllPredictions,
  onError,
  onImageChange,
  setLoadingModels,
  defaultImageUrl = null,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImageUrl);
  const [predictionsByModel, setPredictionsByModel] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);



 const handleUpload = useCallback(async (e) => {
  const file = e.target.files?.[0];
  if (file) {
    if (!ALLOWED_FORMATS.includes(file.type)) {
      setError("Invalid file format. Please upload JPG, JPEG, PNG, or WebP.");
      return;
    }
    setError(null);

    try {
      setLoading(true);
      const response = await uploadImage(file);

      const base64Image = response.data.image; // ✅ get base64 image from backend
      setSelectedImage(base64Image);
      setImagePreview(base64Image); // ✅ show preview as base64
      onImageChange?.(base64Image); // ✅ send to Home.jsx for storage
    } catch (err) {
      setError("Image upload failed. Please try again.");
      onError?.("Image upload failed.");
    } finally {
      setLoading(false);
    }
  }
}, [onError, onImageChange]);


const handlePredict = async () => {
  if (!selectedImage) return;

  const otherModels = MODEL_NAMES.filter((m) => m !== selectedModel);

  const initialLoading = {};
  MODEL_NAMES.forEach((model) => {
    initialLoading[model] = true;
  });
  setLoadingModels(initialLoading);
  setError(null);

  try {
    const mainResult = await predictImage(selectedImage, selectedModel);

    setPredictionsByModel((prev) => ({
      ...prev,
      [selectedModel]: mainResult.data,
    }));
    onAllPredictions?.((prev) => ({
      ...prev,
      [selectedModel]: mainResult.data,
    }));
    setLoadingModels((prev) => ({ ...prev, [selectedModel]: false }));

    Promise.allSettled(
      otherModels.map(async (modelName) => {
        try {
          const result = await predictImage(selectedImage, modelName);
          setPredictionsByModel((prev) => ({
            ...prev,
            [modelName]: result.data,
          }));
          onAllPredictions?.((prev) => ({
            ...prev,
            [modelName]: result.data,
          }));
        } catch (err) {
          console.error(`Error predicting with ${modelName}:`, err);
        } finally {
          setLoadingModels((prev) => ({ ...prev, [modelName]: false }));
        }
      })
    );
  } catch (err) {
    setError("Prediction failed.");
    onError?.("Prediction failed.");
    setLoadingModels({});
  }
};



  const handleRemove = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPredictionsByModel({});
    setError(null);
    onImageChange?.(null);
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  return (
    <Tabs defaultValue="upload" className="my-6 p-4 w-full max-w-3xl mx-auto border border-[#2A2C3F]  rounded-lg ">
      <TabsList className=" border border-[#2A2C3F]">
        <TabsTrigger
          value="upload"
          className="cursor-pointer px-4 py-2 mr-2 data-[state=active]:bg-[#24285d] data-[state=active]:text-white hover:bg-white hover:text-black"
        >
          <Upload className="h-4 w-4 mr-2" /> Upload
        </TabsTrigger>
        <TabsTrigger
          value="results"
          className="cursor-pointer px-4 py-2 data-[state=active]:bg-[#24285d] data-[state=active]:text-white hover:bg-white hover:text-black"
        >
          <Map className="h-4 w-4 mr-2" /> Activation Map
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upload">
        <Card className="border-none">
          <CardContent className="p-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!imagePreview ? (
              <div
                className="border-gray-300 rounded-lg p-20 text-center cursor-pointer"
                onClick={() => document.getElementById("file-upload").click()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleUpload({ target: { files: e.dataTransfer.files } });
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white mx-auto mb-6" />
                ) : (
                  <Upload className="mx-auto mb-6 h-12 w-12" />
                )}

                <p>Click or drag and drop an image here</p>
              </div>
            ) : (
              <div className="relative flex justify-center items-center overflow-hidden">
                <img
                  src={imagePreview}
                  className="object-contain rounded-lg max-h-[400px] w-auto"
                  alt="Uploaded Preview"
                />
                <Button
                  onClick={handleRemove}
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 cursor-pointer bg-[#24275b]/50 hover:bg-opacity-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <Input type="file" className="hidden" id="file-upload" onChange={handleUpload} />
            <Button
              onClick={handlePredict}
              disabled={!selectedImage || loading}
              className="mt-4 w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Predicting..." : "Predict"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="results">
          <ActivationMapViewer activationMapUrls={predictionsByModel[selectedModel]?.activationMapUrls || []} />
      </TabsContent>

</Tabs>

  );
}
