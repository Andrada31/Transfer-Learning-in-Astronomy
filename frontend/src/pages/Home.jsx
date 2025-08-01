import React, { useEffect, useState, useTransition } from "react";
import "@/styles/App.css";
import detectIcon from "@/images/eye2.svg";
import classifyIcon from "@/images/tl3.svg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaTerminal as Terminal } from "react-icons/fa6";
import ModelSelector from "@/components/custom/ModelSelector";
import { ModeProvider } from "@/lib/ModeContext";
import { useMode } from "@/lib/ModeContext";
import { ImageUploaderActivationMap } from "@/components/custom/ImageUploader_ActivationMap";
import { PredictionCard } from "@/components/custom/PredictionCard";
import { DetectionPredictionCard } from "@/components/custom/DetectionPredictionCard";
import { ModelComparisonCharts } from "@/components/custom/ModelComparisonCharts";
import { X } from "lucide-react";
import {
  saveImageData,
  getImageData,
  removeImageData
} from "@/lib/indexedDb";
import DatasetSelector from "@/components/custom/DatasetSelector";

const Home = ({ mode: initialMode = "classification" }) => {
  const { mode, setMode } = useMode();
  const [activeTab, setActiveTab] = useState(initialMode === "detection" ? "yolo11" : "resnet");
  const [imagePreviewByMode, setImagePreviewByMode] = useState({ classification: null, detection: null });
  const [predictionsByMode, setPredictionsByMode] = useState({ classification: {}, detection: {} });
  const [loadingModels, setLoadingModels] = useState({});
  const [showAlert, setShowAlert] = useState(() => {
    return localStorage.getItem("hideDSOAlert") !== "true";
  });
  const [isPending, startTransition] = useTransition();
  const [selectedDatasetKey, setSelectedDatasetKey] = useState("deepspace");
  const currentPrediction =
    mode === "detection"
      ? predictionsByMode[mode][activeTab]?.[selectedDatasetKey] || null
      : predictionsByMode[mode][activeTab] || null;

  const staticModelInfo = {
    resnet: {
      model_name: "ResNet50",
      input_size: "224 x 224 pixels",
      dataset_origin: "ImageNet",
      modelParameters: "25.6 million",
      numLayers: 50,
      flops: "3.8G",
    },
    efficientnet: {
      model_name: "EfficientNet-B0",
      input_size: "224 x 224 pixels",
      dataset_origin: "ImageNet",
      modelParameters: "5.3 million",
      numLayers: 237,
      flops: "0.39B",
    },
    vgg: {
      model_name: "VGG16",
      input_size: "224 x 224 pixels",
      dataset_origin: "ImageNet",
      modelParameters: "138 million",
      numLayers: 16,
      flops: "15.3B",
    },
    yolo11: {
      model_name: "YOLOv11n",
      input_size: "640 x 640 pixels",
      dataset_origin: "MS COCO",
      modelParameters: "5.2 million",
      numLayers: 149,
      flops: "6.1B",
    },
    yolo8: {
      model_name: "YOLOv8-C",
      input_size: "640 x 640 pixels",
      dataset_origin: "MS COCO",
      modelParameters: "11.2 million",
      numLayers: 139,
      flops: "28.8B",
    }
  };

  const baseInfo = staticModelInfo[activeTab] || {};

  const prediction = {
    activationMapUrl: "",
    class: "",
    probability: 0,
    topPredictions: [],
    inference_time: 0,
    ...baseInfo,
    ...currentPrediction,  // This will override defaults if API provides values
  };


  useEffect(() => {
    getImageData(mode).then((data) => {
      const image = data?.image ?? null;
      const predictions = data?.predictions ?? {};

      setImagePreviewByMode((prev) => ({ ...prev, [mode]: image }));
      setPredictionsByMode((prev) => ({ ...prev, [mode]: predictions }));
    });
  }, [mode]);

  useEffect(() => {
    const image = imagePreviewByMode[mode];
    const predictions = predictionsByMode[mode];
    if (image && predictions) {
      (async () => {
        await saveImageData(mode, image, predictions);
      })();
    }
  }, [imagePreviewByMode, predictionsByMode, mode]);

  const handleModelChange = (model) => {
    setActiveTab(model);
  };

  const handleImageChange = (url) => {
    setImagePreviewByMode((prev) => ({
      ...prev,
      [mode]: url,
    }));
    setPredictionsByMode((prev) => ({
      ...prev,
      [mode]: {},
    }));
  };

  const handleAllPredictions = (update) => {
    setPredictionsByMode((prev) => {
      const updated = typeof update === "function" ? update(prev[mode]) : { ...prev[mode], ...update };
      return {
        ...prev,
        [mode]: updated,
      };
    });
  };

  const handleError = () => {
    setPredictionsByMode((prev) => ({
      ...prev,
      [mode]: {},
    }));
  };

  const handleRemove = () => {
  setImagePreviewByMode((prev) => ({
    ...prev,
    [mode]: null,
  }));
  setPredictionsByMode((prev) => ({
    ...prev,
    [mode]: {},
  }));
  (async () => await removeImageData(mode))();
};


  return (
    <div className="flex min-h-screen">
      <div
        className="grow-0 pt-20 px-4 md:px-8 transition-opacity duration-300 ease-in-out"
        style={{ opacity: isPending ? 0 : 1 }}
      >
        {showAlert && (
          <Alert className="relative pr-10 mb-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>Upload an image and analyze it with a deep learning model.</AlertDescription>
            <button
              onClick={() => {
                setShowAlert(false);
                localStorage.setItem("hideDSOAlert", "true");
              }}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </Alert>
        )}

        <h1 className="text-3xl my-4 tracking-tight text-white flex items-center gap-5">
          <img
            src={mode === "classification" ? classifyIcon : detectIcon}
            alt={mode === "classification" ? "Classification Icon" : "Detection Icon"}
            className="w-11 h-11 filter invert brightness-[100%] saturate-0"
          />
          {mode === "classification" ? "CLASSIFICATION" : "DETECTION"}
        </h1>

       <ModelSelector
          mode={mode}
          onModelChange={handleModelChange}
          models={mode === "classification" ? ["resnet", "efficientnet", "vgg"] : ["yolo11", "yolo8"]}
        />

       {mode === "detection" && (
          <DatasetSelector onDatasetChange={(key) => setSelectedDatasetKey(key)} />
        )}

        <ImageUploaderActivationMap
          selectedModel={activeTab}
          selectedDatasetKey={selectedDatasetKey}
          onImageChange={handleImageChange}
          onAllPredictions={handleAllPredictions}
          onError={handleError}
          setLoadingModels={setLoadingModels}
          defaultImageUrl={imagePreviewByMode[mode]}
          defaultPredictions={predictionsByMode[mode]}
          onRemove={handleRemove}
          mode={mode}
        />

        {imagePreviewByMode[mode] && (
          <>
            {loadingModels[activeTab] ? (
              <div className="fixed right-4 top-4 bg-[#1c1c2e] text-white px-6 py-4 rounded-lg shadow-lg">
                <div className="animate-pulse text-sm">Loading {activeTab} prediction...</div>
              </div>
            ) : currentPrediction && (
              mode === "classification" ? (
                <PredictionCard
                  inputImageUrl={imagePreviewByMode[mode]}
                  activationMapUrl={prediction.activationMapUrl}
                  predictedClass={prediction.class}
                  confidenceScore={prediction?.probability || 0}
                  topPredictions={prediction.topPredictions || 0}
                  inferenceTime={prediction.inference_time || 0}
                  modelName={baseInfo.model_name}
                  inputSize={baseInfo.input_size}
                  datasetOrigin={baseInfo.dataset_origin}
                  modelParameters={baseInfo.modelParameters}
                  numLayers={baseInfo.numLayers}
                  flops={baseInfo.flops}
                  onRemove={handleRemove}
                />
              ) : (
                <DetectionPredictionCard
                  inputImageUrl={imagePreviewByMode[mode]}
                  detections={prediction.detections || []}
                  inferenceTime={prediction.inference_time || 0}
                  modelName={baseInfo.model_name}
                  inputSize={baseInfo.input_size}
                  datasetOrigin={baseInfo.dataset_origin}
                  modelParameters={baseInfo.modelParameters}
                  numLayers={baseInfo.numLayers}
                  flops={baseInfo.flops}
                  onRemove={handleRemove}
                />
              )
            )}
          </>
        )}

        {/*<ModelComparisonCharts predictions={predictionsByMode[mode]} />*/}
      </div>

    </div>
  );
};

export default Home;