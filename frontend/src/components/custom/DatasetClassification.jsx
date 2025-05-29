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
  name: "Deep Space Objects HEN 4",
  datasetLink: "https://www.kaggle.com/datasets/andradaparaczki/dso-3c",
  description: "Annotated RGB images of deep sky objects (DSOs) captured using smart telescopes from light-polluted locations in Europe, designed for training YOLO object detection models.",
  size: "2.3 GB",
  format: "JPEG + YOLO TXT",
  overview: {
    samples: 4696,
    features: 608 * 608 * 3,
    classes: 3,
    classDistribution: "300/400/500", //come BAAAACK
    splitRatio: "80/10/10"
  },
  preprocessing: {
    steps: [
      "Cropping to 608x608 patches",
      "Filtering for visible DSOs",
      "Align and stack exposures",
      "Convert to RGB (JPEG, minimal compression)"
    ],
    normalization: "None applied before annotation; dataset is ready-to-use as is",
    missingValues: "No missing labels; one YOLO-format label file per image",
    outliers: "Faint or ambiguous detections were filtered during annotation"
  },
  augmentation: {
    techniques: [
      "Not explicitly applied in the dataset, but recommended during training",
      "Compatible with YOLO pipeline augmentation"
    ],
    multiplier: 1,
    enabled: false
  },
  statistics: {
    accuracy: 89.7,
    precision: 88.5,
    recall: 90.2,
    f1Score: 89.3
  }
}

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
          <TabsTrigger value="statistics" className="data-[state=active]:bg-[#fff] hover:bg-[#161b36] hover:text-white data-[state=active]:text-black cursor-pointer">
            <BarChart3 className="h-4 w-4 mr-2" /> Statistics
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

        <TabsContent value="statistics">
          <Card className="border-none backdrop-blur-sm">
            <CardHeader className="px-1">
              <CardTitle className="text-white">Performance Statistics</CardTitle>
              <CardDescription className="text-white/70">Model performance metrics on this dataset</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 px-0">
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">Accuracy</Label>
                <div className="text-3xl font-bold mt-1">{dataset.statistics.accuracy}%</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">Precision</Label>
                <div className="text-3xl font-bold mt-1">{dataset.statistics.precision}%</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">Recall</Label>
                <div className="text-3xl font-bold mt-1">{dataset.statistics.recall}%</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">F1 Score</Label>
                <div className="text-3xl font-bold mt-1">{dataset.statistics.f1Score}%</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
