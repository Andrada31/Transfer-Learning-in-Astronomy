"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Sparkles, Map } from "lucide-react";
import { uploadImage, predictImage } from "@/services/api";
import ActivationMapViewer from "@/components/custom/ActivationMapViewer";
import RemoveImageDialog from "@/components/custom/RemoveImageDialog";

const ALLOWED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function ImageUploaderActivationMap({
  selectedModel,
  selectedDatasetKey,
  onAllPredictions,
  onError,
  onImageChange,
  onRemove,
  setLoadingModels,
  mode,
  defaultImageUrl = null,
  defaultPredictions = {},
}) {
  const CLASSIFICATION_MODELS = ["resnet", "efficientnet", "vgg"];
  const DETECTION_MODELS = ["yolo11", "yolo8"];
  const MODEL_NAMES = mode === "detection" ? DETECTION_MODELS : CLASSIFICATION_MODELS;
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImageUrl);
  const [predictionsByModel, setPredictionsByModel] = useState({});
  const [error, setError] = useState(null);
  const [similarityInfo, setSimilarityInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("upload");

  useEffect(() => {
    if (imagePreview) {
      const img = new Image();
      img.onload = () => {
        setNaturalWidth(img.width);
        setNaturalHeight(img.height);
      };
      img.src = imagePreview;
    }
  }, [imagePreview]);

  useEffect(() => {
    if (!defaultImageUrl) {
      setImagePreview(null);
      setSelectedImage(null);
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
      setSimilarityInfo(null);

      try {
        setLoading(true);
        const response = await uploadImage(file);
        const base64Image = response.data.image;

        setSelectedImage(base64Image);
        setImagePreview(base64Image);
        onImageChange?.(base64Image);
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
    const initialLoading = {};
    MODEL_NAMES.forEach((model) => {
      initialLoading[model] = true;
    });
    setLoadingModels(initialLoading);
    setError(null);
    setSimilarityInfo(null);

    try {
      if (mode === "detection") {
        const datasets = ["deepspace", "augmented", "balanced"];
        const resultsByDataset = {};
        const results = await Promise.allSettled(
          datasets.map(async (dsKey) => {
            const result = await predictImage(imageToPredict, selectedModel, dsKey);
            return { key: dsKey, data: result.data };
          })
        );

        results.forEach((res) => {
          if (res.status === "fulfilled") {
            resultsByDataset[res.value.key] = res.value.data;
          }
        });

        setPredictionsByModel((prev) => ({
          ...prev,
          [selectedModel]: resultsByDataset,
        }));

        onAllPredictions?.((prev) => ({
          ...prev,
          [selectedModel]: resultsByDataset,
        }));

        if (resultsByDataset[selectedDatasetKey]?.detections?.length > 0) {
          setActiveTab("boxes");
        }

        setLoadingModels((prev) => ({ ...prev, [selectedModel]: false }));
        return;
      }

      const mainResult = await predictImage(imageToPredict, selectedModel);
      const predictionData = mainResult.data;

      setPredictionsByModel((prev) => ({
        ...prev,
        [selectedModel]: predictionData,
      }));

      onAllPredictions?.((prev) => ({
        ...prev,
        [selectedModel]: predictionData,
      }));

      setSimilarityInfo({
        score: predictionData.similarityScore,
        isOOD: predictionData.in_distribution === false,
      });

      if (predictionData.in_distribution === false) {
        setLoadingModels({});
        return;
      }

      setLoadingModels((prev) => ({ ...prev, [selectedModel]: false }));

      await Promise.allSettled(
        MODEL_NAMES.filter((m) => m !== selectedModel).map(async (modelName) => {
          const result = await predictImage(imageToPredict, modelName);
          setPredictionsByModel((prev) => ({
            ...prev,
            [modelName]: result.data,
          }));
          onAllPredictions?.((prev) => ({
            ...prev,
            [modelName]: result.data,
          }));
          setLoadingModels((prev) => ({ ...prev, [modelName]: false }));
        })
      );
    } catch (err) {
      setError("Prediction failed.");
      onError?.("Prediction failed.");
      setLoadingModels({});
    }
  };

  const drawBoundingBoxes = () => {
    const detections = predictionsByModel[selectedModel]?.[selectedDatasetKey]?.detections || [];
    const classColors = {
      clusters: "#ff6b6b",
      galaxies: "#6bc1ff",
      nebulae: "#81f58a",
      other: "#facc15",
      default: "#d3d3d3",
    };

    if (!imagePreview || detections.length === 0) return null;

    return (
      <div className="relative inline-block max-w-full max-h-[500px]">
        <img
          src={imagePreview}
          className="rounded-md max-w-full max-h-[500px]"
          alt="Bounding Box Preview"
        />
        {naturalWidth > 0 && naturalHeight > 0 && (
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {detections.map((det, idx) => {
              if (!det.box) return null;
              const { x1, y1, x2, y2 } = det.box;
              const label = det.class || "object";
              const confidence = (det.confidence * 100).toFixed(1);
              const color = classColors[label.toLowerCase()] || classColors.default;

              return (
                <g key={idx}>
                  <rect
                    x={x1}
                    y={y1}
                    width={x2 - x1}
                    height={y2 - y1}
                    stroke={color}
                    fill="none"
                    strokeWidth="2"
                  />
                  <text
                    x={x1}
                    y={Math.max(y1 - 5, 10)}
                    fill={color}
                    fontSize="12"
                    fontFamily="monospace"
                    stroke="black"
                    strokeWidth="0.3"
                  >
                    {label} ({confidence}%)
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    );
  };

  const isDetectionModel = mode === "detection";

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="my-6 p-4 w-full max-w-3xl mx-auto border border-[#2A2C3F] rounded-lg"
    >
      <div className="relative mb-4">
        <TabsList className="border border-[#2A2C3F] px-2 py-1 rounded-md inline-flex">
          {[{ value: "upload", label: "Upload", icon: Upload },
            !isDetectionModel && { value: "results", label: "Activation Map", icon: Map },
            isDetectionModel && { value: "boxes", label: "Bounding Boxes", icon: Map },
          ]
            .filter(Boolean)
            .map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="cursor-pointer px-4 py-2 data-[state=active]:bg-[#24285d] data-[state=active]:text-white hover:bg-white hover:text-black"
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </TabsTrigger>
            ))}
        </TabsList>

        {imagePreview && (
          <RemoveImageDialog
            onConfirm={() => {
              setSimilarityInfo(null);
              setSelectedImage(null);
              setImagePreview(null);
              setActiveTab("upload");
              if (fileInputRef.current) fileInputRef.current.value = "";
              onRemove?.();
            }}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 bg-[#24275b]/50 hover:bg-opacity-100 cursor-pointer hover:bg-white hover:text-black "
                title="Remove Image"
              >
                <X className="h-4 w-4" />
              </Button>
            }
          />
        )}
      </div>

      <TabsContent value="upload">
        <Card className="border-none">
          <CardContent className="p-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {mode !== "detection" && similarityInfo && (
              <Alert variant={similarityInfo.isOOD ? "destructive" : "default"} className="mb-4">
                <AlertDescription>
                  {similarityInfo.isOOD ? (
                    <>
                      ⚠️ The uploaded image is <strong>out-of-distribution</strong>. <br />
                      Prediction was not performed.
                    </>
                  ) : (
                    <>
                      ✅ Image is <strong>similar</strong> to known DSOs. <br />
                      Similarity score: <strong>{(similarityInfo.score * 100).toFixed(2)}%</strong>
                    </>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {!imagePreview ? (
              <div
                className="border-gray-300 rounded-lg p-20 text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
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
              </div>
            )}

            <Input
              type="file"
              className="hidden"
              id="file-upload"
              ref={fileInputRef}
              onChange={handleUpload}
            />

            <Button
              onClick={handlePredict}
              disabled={!imagePreview || loading}
              className="mt-4 w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Loading..." : "Predict"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="results">
        <Card className="border-none">
          <CardContent className="p-4 flex flex-col items-center">
            <ActivationMapViewer
              mode={mode}
              activationMapUrls={predictionsByModel[selectedModel]?.activationMapUrls}
            />
          </CardContent>
        </Card>
      </TabsContent>

      {isDetectionModel && (
        <TabsContent value="boxes">
          <Card className="border-none">
            <CardContent className="p-4 flex flex-col items-center">
              {drawBoundingBoxes()}
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
}
