export const resnetModels = {
  resnet18: {
    modelName: "ResNet18",
    overviewData: {
      description:
        "ResNet18 is a lightweight convolutional neural network with 18 layers. It's a smaller variant of the ResNet architecture that maintains good performance while requiring fewer computational resources.",
      yearPublished: "2015",
      authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
      paperLink: "https://arxiv.org/abs/1512.03385",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://www.pngwing.com/en/free-png-arnny/download"
    },
    architectureData: {
      layers: 18,
      parameters: "11.7 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "Residual connections (skip connections)",
        "Batch normalization",
        "Global average pooling",
        "Fewer bottleneck blocks than deeper variants",
      ],
    },
  },

  resnet34: {
    modelName: "ResNet34",
    overviewData: {
      description:
        "ResNet34 is a 34-layer deep convolutional neural network that builds upon the ResNet architecture. It offers a good balance between model size and performance.",
      yearPublished: "2015",
      authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
      paperLink: "https://arxiv.org/abs/1512.03385",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://www.pngwing.com/en/free-png-arnny/download"
    },
    architectureData: {
      layers: 34,
      parameters: "21.8 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "Residual connections (skip connections)",
        "Batch normalization",
        "Global average pooling",
        "Basic blocks with two 3×3 convolutions",
      ],
    },
  },

  resnet50: {
    modelName: "ResNet50",
    overviewData: {
      description:
        "ResNet50 is a convolutional neural network that is 50 layers deep. It was introduced in the paper 'Deep Residual Learning for Image Recognition' and is known for introducing skip connections to solve the vanishing gradient problem in deep networks.",
      yearPublished: "2015",
      authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
      paperLink: "https://arxiv.org/abs/1512.03385",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://colab.research.google.com/drive/1kfun5ulki8t3s-sRT4EjR8_XYxEbp5p8?authuser=1#scrollTo=7gz6H33fcJK9"
    },
    architectureData: {
      layers: 50,
      parameters: "25.6 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "Residual connections (skip connections)",
        "Batch normalization after each convolution",
        "Global average pooling",
        "Bottleneck design for computational efficiency",
      ],
    },
    trainingData: {
      dataset: "ImageNet",
      accuracy: "75.3%",
      framework: "TensorFlow / Keras",
      trainingPlatform: "Google Colab",
      hardware: "Colab's NVIDIA T4: 16GB VRAM",
      evaluationMetrics: {
        "Top-1 Accuracy": "75.3%",
        "Top-5 Accuracy": "92.2%",
        Parameters: "25.6M",
        FLOPs: "3.8G",
        "Inference Time": "4.6ms/image",
      },
      lossFunction: "Categorical Cross-Entropy",
      optimizer: "Adam",
      learningRate: "0.0001",
      batchSize: "32"
    },
  },

  resnet101: {
    modelName: "ResNet101",
    overviewData: {
      description:
        "ResNet101 is a deep residual network with 101 layers. It extends the ResNet architecture with additional bottleneck blocks for improved feature extraction and representation learning.",
      yearPublished: "2015",
      authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
      paperLink: "https://arxiv.org/abs/1512.03385",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://www.pngwing.com/en/free-png-arnny/download"
    },
    architectureData: {
      layers: 101,
      parameters: "44.5 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "Residual connections (skip connections)",
        "Batch normalization",
        "Global average pooling",
        "Deeper bottleneck architecture",
        "Higher representational capacity",
      ],
    },
  },

  resnet152: {
    modelName: "ResNet152",
    overviewData: {
      description:
        "ResNet152 is one of the deepest variants of the ResNet architecture with 152 layers. It achieves state-of-the-art performance on image classification tasks while maintaining trainability through its residual learning framework.",
      yearPublished: "2015",
      authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
      paperLink: "https://arxiv.org/abs/1512.03385",
      datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/deepspaceyolodataset-3c-ns",
      notebookLink: "https://www.pngwing.com/en/free-png-arnny/download"
    },
    architectureData: {
      layers: 152,
      parameters: "60.2 million",
      inputSize: "224 x 224 pixels",
      keyFeatures: [
        "Residual connections (skip connections)",
        "Batch normalization",
        "Global average pooling",
        "Very deep bottleneck architecture",
        "Highest representational capacity in the ResNet family",
      ],
    },
  },
};
