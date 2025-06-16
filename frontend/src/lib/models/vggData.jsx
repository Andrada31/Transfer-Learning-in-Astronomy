export const vggModels = {
  vgg11: {
    modelName: "VGG11",
    overviewData: {
      description:
        "VGG11 is the simplest variant of the VGG architecture with 11 layers. It is primarily used for benchmarking and understanding the impact of deeper architectures.",
      yearPublished: "2014",
      authors: ["Karen Simonyan", "Andrew Zisserman"],
      paperLink: "https://arxiv.org/abs/1409.1556",
    },
    architectureData: {
      layers: 11,
      parameters: "132.9 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "Deep convolutional network with simple 3x3 filters",
        "Max pooling layers for downsampling",
        "Fully connected classifier head",
        "No batch normalization",
      ],
    },
  },

  vgg16: {
    modelName: "VGG16",
    overviewData: {
      description:
        "VGG16 is a deep convolutional neural network with 16 weight layers. It is one of the most widely used VGG variants and is known for its simplicity and effectiveness in image classification tasks.",
      yearPublished: "2014",
      authors: ["Karen Simonyan", "Andrew Zisserman"],
      paperLink: "https://arxiv.org/abs/1409.1556",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://colab.research.google.com/drive/1JhN31vFhbX7yZKAzIjW6Ll_-CKVLuaJN?usp=sharing",
    },
    architectureData: {
      layers: 16,
      parameters: "138 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "Five convolutional blocks with ReLU activation",
        "Max pooling layers between blocks",
        "Three fully connected layers at the end",
        "Simple, uniform architecture",
      ],
    },
    trainingData: {
      dataset: "ImageNet",
      accuracy: "71.3%",
      trainingPlatform: "Google Colab",
      framework: "TensorFlow / Keras",
      hardware: "NVIDIA K40 GPUs",
      evaluationMetrics: {
        "Top-1 Accuracy": "71.3%",
        "Top-5 Accuracy": "89.5%",
        Parameters: "138M",
        FLOPs: "15.3B",
        "Inference Time": "8.2ms/image",
      },
      lossFunction: "Categorical Cross Entropy",
      optimizer: "Adam",
      learningRate: "1e-4",
      batchSize: "32",
    },
  },

  vgg19: {
    modelName: "VGG19",
    overviewData: {
      description:
        "VGG19 is a deeper variant of the VGG architecture with 19 layers. It provides slightly better performance than VGG16 at the cost of increased computational demand.",
      yearPublished: "2014",
      authors: ["Karen Simonyan", "Andrew Zisserman"],
      paperLink: "https://arxiv.org/abs/1409.1556",
    },
    architectureData: {
      layers: 19,
      parameters: "143.7 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "Very deep network with repetitive blocks",
        "High parameter count for better representational capacity",
        "Useful for feature extraction and transfer learning",
      ],
    },
  },
};
