import React, { useEffect, useState, useTransition } from "react";
import "@/styles/App.css";
import Sidenavbar from "@/components/custom/Sidenavbar";
import Tooltip from "@/components/custom/Tooltip";
import detectIcon from "@/images/eye2.svg";
import classifyIcon from "@/images/tl3.svg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaTerminal as Terminal } from "react-icons/fa6";
import ModelSelector from "@/components/custom/ModelSelector";
import { ImageUploaderActivationMap } from "@/components/custom/ImageUploader_ActivationMap";
import { PredictionCard } from "@/components/custom/PredictionCard";
import { DetectionPredictionCard } from "@/components/custom/DetectionPredictionCard";
import { HomeMetrics } from "@/components/custom/HomeMetrics";
import { X } from "lucide-react";
import {
  saveImageData,
  getImageData,
  removeImageData
} from "@/lib/indexedDb";

const Home = ({ mode: initialMode = "classification" }) => {
  const [mode, setMode] = useState(initialMode);
  const [activeTab, setActiveTab] = useState("resnet");
  const [imagePreviewByMode, setImagePreviewByMode] = useState({ classification: null, detection: null });
  const [predictionsByMode, setPredictionsByMode] = useState({ classification: {}, detection: {} });
  const [loadingModels, setLoadingModels] = useState({});
  const [showAlert, setShowAlert] = useState(() => {
    return localStorage.getItem("hideDSOAlert") !== "true";
  });
  const [isPending, startTransition] = useTransition();

  const currentPrediction = predictionsByMode[mode][activeTab] || null;

  useEffect(() => {
    getImageData(mode).then((data) => {
      if (data) {
        setImagePreviewByMode((prev) => ({ ...prev, [mode]: data.image }));
        setPredictionsByMode((prev) => ({ ...prev, [mode]: data.predictions }));
      }
    });
  }, [mode]);

  useEffect(() => {
    const image = imagePreviewByMode[mode];
    const predictions = predictionsByMode[mode];
    if (image && predictions) {
      saveImageData(mode, image, predictions);
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
      [mode]: {}, // reset predictions for current mode
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
  removeImageData(mode);
};


  return (
    <div className="flex min-h-screen">
      <Sidenavbar
        setMode={(newMode) => {
          startTransition(() => {
            setMode(newMode);
          });
          window.history.pushState(null, "", newMode === "classification" ? "/" : "/detection");
        }}
      />

      <div
        className="flex-grow grow-0 pt-20 px-4 md:px-8 transition-opacity duration-300 ease-in-out"
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

        <ModelSelector mode={mode} onModelChange={handleModelChange} />

        <ImageUploaderActivationMap
          selectedModel={activeTab}
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
                  activationMapUrl={currentPrediction.activationMapUrl}
                  predictedClass={currentPrediction.class}
                  confidenceScore={currentPrediction.probability}
                  topPredictions={currentPrediction.topPredictions || []}
                  inferenceTime={currentPrediction.inference_time || 0}
                  modelName={currentPrediction.model_name}
                  inputSize={currentPrediction.input_size}
                  datasetOrigin={currentPrediction.dataset_origin}
                  modelParameters={currentPrediction.modelParameters}
                  numLayers={currentPrediction.numLayers}
                  flops={currentPrediction.flops}
                  onRemove={handleRemove}
                />
              ) : (
                <DetectionPredictionCard
                  inputImageUrl={imagePreviewByMode[mode]}
                  detections={currentPrediction.detections || []}
                  inferenceTime={currentPrediction.inference_time || 0}
                  modelName={currentPrediction.model_name}
                  inputSize={currentPrediction.input_size}
                  modelParameters={currentPrediction.modelParameters}
                  numLayers={currentPrediction.numLayers}
                  flops={currentPrediction.flops}
                  onRemove={handleRemove}
                />
              )
            )}
          </>
        )}

        <HomeMetrics predictions={predictionsByMode[mode]} />
      </div>
    </div>
  );
};

export default Home;
