export const vggModels = {
  vgg11: {
    modelName: "VGG11",
    overviewData: {
      description:
        "VGG11 is the simplest model in the VGG family with 11 layers, using a sequence of 3×3 convolutional filters. It laid the foundation for deeper VGG models with consistent filter sizes and max pooling.",
      yearPublished: "2014",
      authors: ["Karen Simonyan", "Andrew Zisserman"],
      paperLink: "https://arxiv.org/abs/1409.1556",
    },
    architectureData: {
      layers: 11,
      parameters: "132 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "3×3 convolutional filters",
        "Max pooling after conv blocks",
        "Fully connected classifier",
        "Simple and sequential architecture",
      ],
    },
    trainingData: {
      dataset: "ImageNet",
      accuracy: "69.0%",
      trainingTime: "~2 weeks on 4 GPUs",
      hardware: "NVIDIA K40 GPUs",
      evaluationMetrics: {
        "Top-1 Accuracy": "69.0%",
        "Top-5 Accuracy": "88.6%",
        Parameters: "132M",
        FLOPs: "7.6B",
        "Inference Time": "6.5ms/image",
      },
    },
  },

  vgg16: {
    modelName: "VGG16",
    overviewData: {
      description:
        "VGG16 is a deep convolutional neural network with 16 weight layers. It became popular for its simplicity and uniform use of 3×3 convolutions and is widely used in transfer learning tasks.",
      yearPublished: "2014",
      authors: ["Karen Simonyan", "Andrew Zisserman"],
      paperLink: "https://arxiv.org/abs/1409.1556",
    },
    architectureData: {
      layers: 16,
      parameters: "138 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "13 conv + 3 fully connected layers",
        "3×3 convolutions, stride 1",
        "Max pooling layers",
        "Very deep and consistent structure",
      ],
    },
    trainingData: {
      dataset: "ImageNet",
      accuracy: "71.3%",
      trainingTime: "~2–3 weeks on 4 GPUs",
      hardware: "NVIDIA K40 GPUs",
      evaluationMetrics: {
        "Top-1 Accuracy": "71.3%",
        "Top-5 Accuracy": "89.5%",
        Parameters: "138M",
        FLOPs: "15.3B",
        "Inference Time": "8.2ms/image",
      },
    },
  },

  vgg19: {
    modelName: "VGG19",
    overviewData: {
      description:
        "VGG19 is a deeper variant of VGG16 with 19 layers. It improves feature extraction slightly while increasing model size and computational cost.",
      yearPublished: "2014",
      authors: ["Karen Simonyan", "Andrew Zisserman"],
      paperLink: "https://arxiv.org/abs/1409.1556",
    },
    architectureData: {
      layers: 19,
      parameters: "144 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "16 conv + 3 fully connected layers",
        "Increased depth for finer feature learning",
        "Same 3×3 convolution pattern",
        "Often used in style transfer tasks",
      ],
    },
    trainingData: {
      dataset: "ImageNet",
      accuracy: "71.9%",
      trainingTime: "~3 weeks on 4 GPUs",
      hardware: "NVIDIA K40 GPUs",
      evaluationMetrics: {
        "Top-1 Accuracy": "71.9%",
        "Top-5 Accuracy": "89.8%",
        Parameters: "144M",
        FLOPs: "19.6B",
        "Inference Time": "9.8ms/image",
      },
    },
  },
};
