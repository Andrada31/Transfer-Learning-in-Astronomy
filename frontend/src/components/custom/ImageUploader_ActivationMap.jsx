"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Sparkles, Map } from "lucide-react";
import { uploadImage, predictImage } from "@/services/api";
import ActivationMapViewer from "@/components/custom/ActivationMapViewer";

const ALLOWED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MODEL_NAMES = ["resnet", "efficientnet", "vgg"];

export function ImageUploaderActivationMap({
  selectedModel,
  onAllPredictions,
  onError,
  onImageChange,
  onRemove,
  setLoadingModels,
  defaultImageUrl = null,
  defaultPredictions = {},
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImageUrl); // <- initialize with stored
  const [predictionsByModel, setPredictionsByModel] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    if (!defaultImageUrl) {
      setImagePreview(null);
      setSelectedImage(null); // <- clear internal reference too
    } else {
      setImagePreview(defaultImageUrl);
    }

    if (defaultPredictions) {
      setPredictionsByModel(defaultPredictions);
    }
  }, [defaultImageUrl, defaultPredictions]);

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
        const base64Image = response.data.image;

        setSelectedImage(base64Image);
        setImagePreview(base64Image);
        onImageChange?.(base64Image); // update parent for persistence
      } catch (err) {
        setError("Image upload failed. Please try again.");
        onError?.("Image upload failed.");
      } finally {
        setLoading(false);
      }
    }
  }, [onError, onImageChange]);

  const handlePredict = async () => {
    if (!selectedImage && !imagePreview) return;

    const imageToPredict = selectedImage || imagePreview;

    const otherModels = MODEL_NAMES.filter((m) => m !== selectedModel);
    const initialLoading = {};
    MODEL_NAMES.forEach((model) => {
      initialLoading[model] = true;
    });
    setLoadingModels(initialLoading);
    setError(null);

    try {
      const mainResult = await predictImage(imageToPredict, selectedModel);
      setPredictionsByModel((prev) => ({
        ...prev,
        [selectedModel]: mainResult.data,
      }));
      onAllPredictions?.((prev) => ({
        ...prev,
        [selectedModel]: mainResult.data,
      }));
      setLoadingModels((prev) => ({ ...prev, [selectedModel]: false }));

      // Predict with other models in the background
      Promise.allSettled(
        otherModels.map(async (modelName) => {
          try {
            const result = await predictImage(imageToPredict, modelName);
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

  return (
    <Tabs defaultValue="upload" className="my-6 p-4 w-full max-w-3xl mx-auto border border-[#2A2C3F] rounded-lg">
      <TabsList className="border border-[#2A2C3F]">
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
                  onClick={onRemove}
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
              disabled={!imagePreview || loading}
              className="mt-4 w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Predicting..." : "Predict"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="results">
        <Card className="border-none">
          <CardContent className="p-4 flex flex-col items-center">
            <ActivationMapViewer
              activationMapUrls={
                predictionsByModel[selectedModel]?.activationMapUrls ||
                [predictionsByModel[selectedModel]?.activationMapUrl].filter(Boolean)
              }
            />
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  );
}
