export const efficientNetModels = {
  efficientnetb0: {
    modelName: "EfficientNet-B0",
    overviewData: {
      description:
        "EfficientNet-B0 is the baseline model of the EfficientNet family, designed using neural architecture search to optimize both accuracy and efficiency. It balances width, depth, and resolution using compound scaling.",
      yearPublished: "2019",
      authors: ["Mingxing Tan", "Quoc V. Le"],
      paperLink: "https://arxiv.org/abs/1905.11946",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://colab.research.google.com/drive/1QPgiamn--HrZYts9vc0mm6dops6s4U2n?authuser=1#scrollTo=0Wg9jDF6IQ9c"
    },
    architectureData: {
      layers: 237,
      parameters: "5.3 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "MBConv blocks with squeeze-and-excitation",
        "Swish activation function",
        "Compound scaling of depth, width, and resolution",
        "Lightweight and mobile-friendly",
      ],
    },
    trainingData: {
      dataset: "ImageNet",
      accuracy: "77.1%",
      trainingTime: "~3 days on 8 TPUs",
      hardware: "Google TPU v3",
      evaluationMetrics: {
        "Top-1 Accuracy": "77.1%",
        "Top-5 Accuracy": "93.3%",
        Parameters: "5.3M",
        FLOPs: "0.39B",
        "Inference Time": "2.0ms/image",
      },
    },
  },

  efficientnetb3: {
    modelName: "EfficientNet-B3",
    overviewData: {
      description:
        "EfficientNet-B3 is a scaled-up version of EfficientNet-B0 with better accuracy and higher computational cost. It provides a great trade-off between performance and efficiency for image classification.",
      yearPublished: "2019",
      authors: ["Mingxing Tan", "Quoc V. Le"],
      paperLink: "https://arxiv.org/abs/1905.11946",
    },
    architectureData: {
      layers: 300,
      parameters: "12 million",
      inputSize: "300 x 300 pixels",
      keyFeatures: [
        "Compound scaled MBConv blocks",
        "Squeeze-and-excitation optimization",
        "Increased depth and width",
        "More accurate than B0/B1 while still efficient",
      ],
    },
    trainingData: {
      dataset: "ImageNet",
      accuracy: "81.6%",
      trainingTime: "~6 days on 8 TPUs",
      hardware: "Google TPU v3",
      evaluationMetrics: {
        "Top-1 Accuracy": "81.6%",
        "Top-5 Accuracy": "94.9%",
        Parameters: "12M",
        FLOPs: "1.8B",
        "Inference Time": "6.2ms/image",
      },
    },
  },

  efficientnetb7: {
    modelName: "EfficientNet-B7",
    overviewData: {
      description:
        "EfficientNet-B7 is the largest and most accurate model in the EfficientNet family. It achieves state-of-the-art performance on ImageNet with a high computational cost.",
      yearPublished: "2019",
      authors: ["Mingxing Tan", "Quoc V. Le"],
      paperLink: "https://arxiv.org/abs/1905.11946",
    },
    architectureData: {
      layers: 480,
      parameters: "66 million",
      inputSize: "600 x 600 pixels",
      keyFeatures: [
        "Deep and wide MBConv network",
        "Squeeze-and-excitation and swish activation",
        "Massive input resolution",
        "Designed for high-end GPUs/TPUs",
      ],
    },
    trainingData: {
      dataset: "ImageNet",
      accuracy: "84.3%",
      trainingTime: "~10 days on TPU pods",
      hardware: "Google TPU v3 Pod",
      evaluationMetrics: {
        "Top-1 Accuracy": "84.3%",
        "Top-5 Accuracy": "97.0%",
        Parameters: "66M",
        FLOPs: "37B",
        "Inference Time": "34.9ms/image",
      },
    },
  },
};
