// lib/modelData.jsx

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
    trainingData: {
      dataset: "ImageNet",
      accuracy: "69.8%",
      trainingTime: "~1 week on 8 GPUs",
      hardware: "NVIDIA Tesla P100 GPUs",
      evaluationMetrics: {
        "Top-1 Accuracy": "69.8%",
        "Top-5 Accuracy": "89.1%",
        Parameters: "11.7M",
        FLOPs: "1.8G",
        "Inference Time": "1.4ms/image",
      },
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
    trainingData: {
      dataset: "ImageNet ",
      accuracy: "73.3%",
      trainingTime: "~10 days on 8 GPUs",
      hardware: "NVIDIA Tesla P100 GPUs",
      evaluationMetrics: {
        "Top-1 Accuracy": "73.3%",
        "Top-5 Accuracy": "91.4%",
        Parameters: "21.8M",
        FLOPs: "3.6G",
        "Inference Time": "3.6ms/image",
      },
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
      notebookLink: "https://www.pngwing.com/en/free-png-arnny/download"
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
      trainingTime: "30 epochs",
      hardware: "Colab's NVIDIA T4: 16GB VRAM",
      evaluationMetrics: {
        "Top-1 Accuracy": "75.3%",
        "Top-5 Accuracy": "92.2%",
        Parameters: "25.6M",
        FLOPs: "3.8G",
        "Inference Time": "4.6ms/image",
      },
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
    trainingData: {
      dataset: "ImageNet",
      accuracy: "76.4%",
      trainingTime: "~3 weeks on 8 GPUs",
      hardware: "NVIDIA Tesla P100 GPUs",
      evaluationMetrics: {
        "Top-1 Accuracy": "76.4%",
        "Top-5 Accuracy": "92.9%",
        Parameters: "44.5M",
        FLOPs: "7.6G",
        "Inference Time": "7.8ms/image",
      },
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
    trainingData: {
      dataset: "ImageNet",
      accuracy: "77.8%",
      trainingTime: "~4 weeks on 8 GPUs",
      hardware: "NVIDIA Tesla P100 GPUs",
      evaluationMetrics: {
        "Top-1 Accuracy": "77.8%",
        "Top-5 Accuracy": "93.6%",
        Parameters: "60.2M",
        FLOPs: "11.3G",
        "Inference Time": "12.1ms/image",
      },
    },
  },
};
