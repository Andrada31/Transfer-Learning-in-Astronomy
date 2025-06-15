export const yoloModels = {

  yolov8c: {
    modelName: "YOLOv8-C",
    overviewData: {
      description:
        "YOLOv8-C is a compact variant of the YOLOv8 architecture designed for real-time object detection with balanced performance and speed. It is well-suited for custom training tasks on lightweight datasets like DeepSpaceYoloDataset.",
      yearPublished: "2023",
      authors: ["Ultralytics Team"],
      paperLink: "https://docs.ultralytics.com/models/yolov8/",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://www.kaggle.com/code/andradaparaczki/yolov8"
    },
    architectureData: {
      layers: "~139",
      parameters: "11.2 million",
      inputSize: "640 x 640 pixels",
      keyFeatures: [
        "Anchor-free detection head for simplicity and speed",
        "Task-specific decoupled heads for classification and localization",
        "C2f modules for efficient computation",
        "Designed for easy deployment and fine-tuning"
      ],
    },
    trainingData: {
      dataset: "MS COCO",
      accuracy: "mAP50-95: 47.6%",
      trainingTime: "~3 hours on 1 Tesla P100",
      hardware: "NVIDIA Tesla P100 GPU",
      evaluationMetrics: {
        "mAP50-95": "47.6%",
        "Parameters": "11.2M",
        "FLOPs": "28.8B",
        "Inference Time": "5.8ms/image"
      },
      lossFunction: "Composite YOLO Loss (Box + Class + DFL)",
      optimizer: "AdamW",
      learningRate: "0.001429",
      batchSize: "16",
    },
  },

  yolo11: {
    modelName: "YOLOv11n",
    overviewData: {
      description:
        "YOLOv11n is the nano variant of YOLOv11, optimized for speed and low-resource devices while maintaining competitive accuracy. It leverages C3K2 blocks, SPPF, and C2PSA to balance performance and efficiency.",
      yearPublished: "2024",
      authors: ["Rahima Khanam", "Muhammad Hussain"],
      paperLink: "https://arxiv.org/abs/2410.17725",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://www.kaggle.com/code/andradaparaczki/yolo11n"
    },
    architectureData: {
      layers: "~ 149",
      parameters: "5.2 million",
      inputSize: "640 x 640 pixels",
      keyFeatures: [
        "C3K2 blocks for efficient feature extraction",
        "SPPF for multi-scale feature aggregation",
        "C2PSA for enhanced spatial attention",
        "Lightweight model optimized for mobile and edge devices"
      ],
    },
    trainingData: {
      dataset: "MS COCO",
      accuracy: "mAP50-95: 43.1%",
      trainingTime: "~1 week on 8 GPUs",
      hardware: "NVIDIA Tesla P100 GPU",
      evaluationMetrics: {
        "mAP50-95": "43.1%",
        "Parameters": "5.2M",
        "FLOPs": "6.1B",
        "Inference Time": "3.2ms/image"
      },
      lossFunction: "Composite YOLO Loss (Box + Class + DFL)",
      optimizer: "AdamW",
      learningRate: "0.001429",
      batchSize: "16"
    },
  },

};
