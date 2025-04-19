// lib/modelData.jsx

export const yoloModels = {
  // Existing YOLO models...

  yolov9: {
    modelName: "YOLOv9",
    overviewData: {
      description:
        "YOLOv9 introduces the GELAN (Generalized Efficient Layer Aggregation Network) architecture and Programmable Gradient Information (PGI) to enhance accuracy and efficiency in real-time object detection.",
      yearPublished: "2024",
      authors: ["Chien-Yao Wang", "I-Hau Yeh", "Hong-Yuan Mark Liao"],
      paperLink: "https://arxiv.org/abs/2402.13616",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://github.com/WongKinYiu/yolov9"
    },
    architectureData: {
      layers: "Varies by model size (e.g., YOLOv9s, YOLOv9m, YOLOv9e)",
      parameters: "2M (YOLOv9t) to 57.3M (YOLOv9e)",
      inputSize: "640 x 640 pixels",
      keyFeatures: [
        "GELAN architecture for efficient layer aggregation",
        "Programmable Gradient Information (PGI) for improved gradient flow",
        "Enhanced accuracy with reduced computational complexity",
        "Suitable for deployment across various hardware platforms"
      ],
    },
    trainingData: {
      dataset: "MS COCO",
      accuracy: "mAP50-95: 55.6% (YOLOv9e)",
      trainingTime: "~1 week on 8 GPUs",
      hardware: "NVIDIA Tesla P100 GPUs",
      evaluationMetrics: {
        "mAP50-95": "55.6%",
        Parameters: "2M to 57.3M",
        FLOPs: "7.7B (YOLOv9t) to 189.0B (YOLOv9e)",
        "Inference Time": "2.3ms (YOLOv9t) to 16.77ms (YOLOv9e)"
      },
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
      notebookLink: "https://github.com/ultralytics/yolov11"
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
      hardware: "NVIDIA Tesla P100 GPUs",
      evaluationMetrics: {
        "mAP50-95": "43.1%",
        "Parameters": "5.2M",
        "FLOPs": "6.1B",
        "Inference Time": "3.2ms/image"
      },
    },
  },

};
