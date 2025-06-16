"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Database, BarChart3, Shuffle, Settings, ExternalLink } from "lucide-react"

const dataset = {
  id: "dataset1",
  name: "DeepSky3-HEN",
  datasetLink: "https://kaggle.com/datasets/a2cb6615c3d14d29d4b87ff121a52aa7140b7674901aaffd0832cc2d8eb04b34",
  description: "RGB dataset with images of deep space objects (DSOs) collected from ESA/Hubble, NOIRLab, and ESO archives. Can be used for training and evaluating deep learning classification models using transfer learning.",
  size: "18.98 MB",
  format: "JPEG",
  overview: {
    samples: 1951,
    features: 224 * 224 * 3,
    classes: 4,
    classDistribution: {
      train: { clusters: 302, galaxies: 305, nebulae: 327, other: 317 },
      validation: { clusters: 75, galaxies: 76, nebulae: 81, other: 79 },
      test: { clusters: 94, galaxies: 95, nebulae: 102, other: 98 }
    },
    splitRatio: "80/10/10"
  },
  preprocessing: {
    steps: [
      "Resize all images to 224x224 pixels",
      "Class labels inferred from filenames",
      "Images grouped into train/validation/test folders"
    ],
    normalization: "Keras `preprocess_input()` used during training and inference",
    missingValues: "No missing labels; all images are categorized into 4 classes",
    outliers: "Low-quality or unidentifiable DSOs were excluded manually"
  },
  augmentation: {
    techniques: [
      "Rotation (±30°)",
      "Width/height shift (±10%)",
      "Zoom (±10%)",
      "Brightness adjustment (range: 0.8 to 1.2)",
      "Shear transformation (0.2)",
      "Horizontal flipping",
      "Nearest neighbor fill"
    ],
    multiplier: 1,
    enabled: true
  },
  statistics: {
    accuracy: null,
    precision: null,
    recall: null,
    f1Score: null
  },
  metadata: {
    sourceArchives: ["ESA/Hubble", "NOIRLab", "ESO"],
    imageDimensions: "224x224",
    imageType: "RGB",
    labelingMethod: "Keyword-based auto-labeling with manual verification",
    classNames: ["clusters", "galaxies", "nebulae", "other"]
  }
};


export default function DatasetClassification() {
  return (
    <div className="w-full max-w-5xl mx-auto backdrop-blur-sm rounded-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 my-8">
          <Database className="h-8 w-8 text-white" />
          <h2 className="text-2xl text-white">Dataset Overview</h2>
        </div>

        <div className="rounded-lg p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-2">{dataset.name}</h3>
          <p className="text-white/70 mb-2">{dataset.description}</p>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {dataset.size}
            </Badge>
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              {dataset.format}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#2a3158] border border-white/10 pt-[2px]">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#fff] hover:bg-[#161b36] hover:text-white data-[state=active]:text-black cursor-pointer">
            <BarChart3 className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="preprocessing" className="data-[state=active]:bg-[#fff] hover:bg-[#161b36] hover:text-white data-[state=active]:text-black cursor-pointer">
            <Settings className="h-4 w-4 mr-2" /> Preprocessing
          </TabsTrigger>
          <TabsTrigger value="augmentation" className="data-[state=active]:bg-[#fff] hover:bg-[#161b36] hover:text-white data-[state=active]:text-black cursor-pointer">
            <Shuffle className="h-4 w-4 mr-2" /> Augmentation
          </TabsTrigger>
          <TabsTrigger value="metadata" className="data-[state=active]:bg-[#fff] hover:bg-[#161b36] hover:text-white data-[state=active]:text-black cursor-pointer">
            <BarChart3 className="h-4 w-4 mr-2" /> Metadata
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="border-none backdrop-blur-sm">
            <CardHeader className="px-1">
              <CardTitle className="text-white">Dataset Overview</CardTitle>
              <CardDescription className="text-white/70">Basic information and structure of the dataset</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 px-1">
              <div>
                <Label className="text-white/80">Total Samples</Label>
                <div className="text-2xl font-bold text-white">{dataset.overview.samples.toLocaleString()}</div>
              </div>
              <div>
                <Label className="text-white/80">Features</Label>
                <div className="text-2xl font-bold text-white">{dataset.overview.features.toLocaleString()}</div>
              </div>
              <div>
                <Label className="text-white/80">Classes</Label>
                <div className="text-2xl font-bold text-white">{dataset.overview.classes}</div>
              </div>
              <div>
                <Label className="text-white/80">Train/Val/Test Split</Label>
                <div className="text-lg font-semibold text-white">{dataset.overview.splitRatio}</div>
              </div>
              {dataset.datasetLink && (
                <div className="col-span-2">
                  <button
                    onClick={() => window.open(dataset.datasetLink, "_blank")}
                    className="flex items-center justify-center px-4 py-2 border border-gray-600 text-white hover:bg-white hover:text-black cursor-pointer bg-transparent rounded w-full sm:w-auto"
                  >
                    View Dataset
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preprocessing">
          <Card className="border-none backdrop-blur-sm">
            <CardHeader className="px-1">
              <CardTitle className="text-white">Data Preprocessing</CardTitle>
              <CardDescription className="text-white/70">Steps taken to clean and prepare the data</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-2 px-2">
                {dataset.preprocessing.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-white">{step}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-3 rounded-lg border border-white/10">
                  <Label className="text-white/80">Normalization</Label>
                  <p className="text-white mt-4 text-sm">{dataset.preprocessing.normalization}</p>
                </div>
                <div className="p-3 rounded-lg border border-white/10">
                  <Label className="text-white/80">Missing Values</Label>
                  <p className="text-white mt-4 text-sm">{dataset.preprocessing.missingValues}</p>
                </div>
                <div className="p-3 rounded-lg border border-white/10">
                  <Label className="text-white/80">Outliers</Label>
                  <p className="text-white mt-4 text-sm">{dataset.preprocessing.outliers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="augmentation">
          <Card className="border-none backdrop-blur-sm">
            <CardHeader className="px-1">
              <CardTitle className="text-white">Data Augmentation</CardTitle>
              <CardDescription className="text-white/70">Techniques used to increase dataset diversity</CardDescription>
            </CardHeader>
            <CardContent className="px-1">
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Label className="text-white/80">Status:</Label>
                  <Badge className={dataset.augmentation.enabled ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}>
                    {dataset.augmentation.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-white/80">Multiplier:</Label>
                  <span className="text-xl font-bold text-blue-400">{dataset.augmentation.multiplier}x</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {dataset.augmentation.techniques.map((tech, i) => (
                  <div key={i} className="p-2 rounded border border-white/10 text-white/90">{tech}</div>
                ))}
              </div>

              <div className="bg-[#293158]/10 p-4 mt-4 rounded-lg border border-blue-200/20 text-blue-200 text-sm">
                <strong>Effect:</strong> Dataset size increased from {dataset.overview.samples.toLocaleString()} to {(dataset.overview.samples * dataset.augmentation.multiplier).toLocaleString()} samples.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata">
          <Card className="border-none backdrop-blur-sm">
            <CardHeader className="px-1">
              <CardTitle className="text-white">Dataset Metadata</CardTitle>
              <CardDescription className="text-white/70">Static information about the dataset’s source and structure</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 px-1">
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">Source Archives</Label>
                <div className="text-white mt-1 text-sm">{dataset.metadata.sourceArchives.join(", ")}</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">Image Dimensions</Label>
                <div className="text-white mt-1 text-sm">{dataset.metadata.imageDimensions}</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">Image Type</Label>
                <div className="text-white mt-1 text-sm">{dataset.metadata.imageType}</div>
              </div>
              {/*<div className="p-4 rounded-lg border border-white/10 col-span-2">*/}
              {/*  <Label className="text-white/80 text-sm">Labeling Method</Label>*/}
              {/*  <div className="text-white mt-1 text-sm">{dataset.metadata.labelingMethod}</div>*/}
              {/*</div>*/}
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">Class Names</Label>
                <div className="text-white mt-1 text-sm">{dataset.metadata.classNames.join(", ")}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
