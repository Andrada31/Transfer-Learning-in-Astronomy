"use client"

import { useState } from "react"
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
import {Database, BarChart3, Shuffle, Settings, ExternalLink} from "lucide-react"
import CustomSelectTrigger from "@/components/custom/CustomSelectTrigger"

const datasets = [
  {
    id: "dataset1",
    name: "Deep Space Yolo Dataset",
    datasetLink: "https://zenodo.org/record/8387071",
    description: "Annotated RGB images of deep sky objects (DSOs) captured using smart telescopes from light-polluted locations in Europe, designed for training YOLO object detection models.",
    size: "2.3 GB",
    format: "JPEG (608x608)",
    overview: {
      samples: 4696,
      annotationFormat: "YOLO TXT",
      classes: 1,
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
      accuracy: "-",
      precision: 74.6,
      recall: 62.7,
      f1Score: 68.1
    }
  },
  {
    id: "dataset2",
    name: "Augmented Deep Space Yolo Dataset",
    datasetLink: "https://github.com/Leo-Thomas/Augmented-DeepSpaceYolo",
    description: "An augmented version of DeepSpaceYoloDataset, containing annotated astronomical images with nebulae, galaxies, and globular clusters, designed for robust deep sky object detection.",
    size: "2.3 GB",
    format: "JPEG (608x608) ",
    overview: {
      samples: 8421,
      annotationFormat: "YOLO TXT",
      classes: 1,
      splitRatio: "80/10/10"
    },
    preprocessing: {
      steps: [
        "Zoom and cropping (0–20%)",
        "Rotation (−15° to +15°)",
        "Brightness adjustment (−15% to +15%)",
        "Blurring (up to 2.5 pixels)",
        "Noise addition (up to 0.15%)"
      ],
      normalization: "None applied pre-release; augmentations simulate natural observational conditions",
      missingValues: "None; each image has a corresponding YOLO-format label file",
      outliers: "Controlled via augmentation; faint objects maintained, artifacts excluded"
    },
    augmentation: {
      techniques: [
        "Zooming and cropping",
        "Rotation",
        "Brightness adjustment",
        "Blurring",
        "Noise addition"
      ],
      multiplier: 1.79,
      enabled: true
    },
    statistics: {
      accuracy: "-",
      precision: 81.0,
      recall: 57.9,
      f1Score: 67.5,
     "mAP@50": 76.1,
    "mAP@50:95": 59.4
    }
  },
  {
    id: "dataset3",
    name: "Balanced Yolo Dataset",
    description: "Balanced DeepSpaceYoloDataset reannotated for multi-class detection with nebulae, galaxies, and star clusters. Includes grayscale telescope-filtered variants and class-specific augmentation for robustness.",
    size: "1.8 GB",
    format: "PNG/JPEG/WEBP/JPG ",
    overview: {
      samples: 8185,
      annotationFormat: "YOLO TXT",
      classes: 3,
      splitRatio: "80/10/10"
    },
    preprocessing: {
      steps: [
        "Resize all images to 640x640",
        "Apply grayscale telescope simulation (brightness, haze, contrast)",
        "Normalize bounding box coordinates to YOLO format",
        "Manually relabel DSO bounding boxes using MakeSense"
      ],
      normalization: "None during image prep; bbox normalized to YOLO format",
      missingValues: "None; all images are annotated",
      outliers: "Faint objects reviewed; incorrect annotations removed"
    },
    augmentation: {
      techniques: [
        "Mild Gaussian & median blur (Albumentations)",
        "Grayscale conversion with CLAHE",
        "Brightness & contrast adjustment",
        "Hue shift & elastic transforms (class-specific)",
        "Online augmentation via Ultralytics during training"
      ],
      multiplier: 1.5,
      enabled: true
    },
    statistics: {
      accuracy: "-",
      precision: 79.7,
      recall: 71.4,
      f1Score: 75.3
    }
  }
]


export function DatasetDetection() {
  const [selectedDataset, setSelectedDataset] = useState(datasets[0].id)
  const currentDataset = datasets.find((d) => d.id === selectedDataset) || datasets[0]

  return (
    <div className="w-full max-w-5xl mx-auto backdrop-blur-sm rounded-lg 0">
      <div className="mb-6">
        <div className="flex items-center gap-2 my-8">
          <Database className="h-8 w-8 text-white" />
          <h2 className="text-2xl text-white">Dataset Comparison</h2>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Label htmlFor="dataset-select" className="text-white/80">
            Select Dataset:
          </Label>

          <CustomSelectTrigger
            value={selectedDataset}
            onChange={setSelectedDataset}
            options={datasets}
          />


        </div>

        <div className="rounded-lg p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-2">{currentDataset.name}</h3>
          <p className="text-white/70 mb-2">{currentDataset.description}</p>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {currentDataset.size}
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {currentDataset.format}
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

        <TabsContent  value="overview">
          <Card className=" border-none backdrop-blur-sm">
            <CardHeader className="px-1">
              <CardTitle className="text-white">Dataset Overview</CardTitle>
              <CardDescription className="text-white/70">Basic information and structure of the dataset</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 px-1">
              <div>
                <Label className="text-white/80">Total Samples</Label>
                <div className="text-2xl font-bold text-white">{currentDataset.overview.samples.toLocaleString()}</div>
              </div>
              <div>
                <Label className="text-white/80">Annotation Format</Label>
                <div className="text-2xl font-bold text-white">{currentDataset.overview.annotationFormat}</div>

              </div>
              <div>
                <Label className="text-white/80">Classes</Label>
                <div className="text-2xl font-bold text-white">{currentDataset.overview.classes}</div>
              </div>
              <div>
                <Label className="text-white/80">Train/Val/Test Split</Label>
                <div className="text-lg font-semibold text-white">{currentDataset.overview.splitRatio}</div>
              </div>

              {/* Dataset link button */}
                {currentDataset.datasetLink && (
                  <div className="col-span-2">
                    <button
                        onClick={() => window.open(currentDataset.datasetLink, "_blank")}
                        className="flex items-center justify-center px-4 py-2 border border-gray-600 text-white hover:bg-white hover:text-black cursor-pointer bg-transparent rounded w-full sm:w-auto"
                    >
                      View Dataset
                      <ExternalLink className="ml-2 h-4 w-4"/>
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
                {currentDataset.preprocessing.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-white">{step}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-3 rounded-lg border border-white/10">
                  <Label className="text-white/80">Normalization</Label>
                  <p className="text-white mt-4 text-sm">{currentDataset.preprocessing.normalization}</p>
                </div>
                <div className="p-3 rounded-lg  border border-white/10">
                  <Label className="text-white/80">Missing Values</Label>
                  <p className="text-white mt-4 text-sm">{currentDataset.preprocessing.missingValues}</p>
                </div>
                <div className="p-3 rounded-lg  border border-white/10">
                  <Label className="text-white/80">Outliers</Label>
                  <p className="text-white mt-4 text-sm">{currentDataset.preprocessing.outliers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="augmentation">
          <Card className=" border-none backdrop-blur-sm">
            <CardHeader className="px-1">
              <CardTitle className="text-white">Data Augmentation</CardTitle>
              <CardDescription className="text-white/70">Techniques used to increase dataset diversity</CardDescription>
            </CardHeader>
            <CardContent className="px-1">
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Label className="text-white/80">Status:</Label>
                  <Badge className={currentDataset.augmentation.enabled ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}>
                    {currentDataset.augmentation.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-white/80">Multiplier:</Label>
                  <span className="text-xl font-bold text-blue-400">{currentDataset.augmentation.multiplier}x</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {currentDataset.augmentation.techniques.map((tech, i) => (
                  <div key={i} className="p-2 rounded border border-white/10 text-white/90">{tech}</div>
                ))}
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
                <div className="text-3xl font-bold  mt-1">{currentDataset.statistics.accuracy}%</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">Precision</Label>
                <div className="text-3xl font-bold  mt-1">{currentDataset.statistics.precision}%</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">Recall</Label>
                <div className="text-3xl font-bold  mt-1">{currentDataset.statistics.recall}%</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <Label className="text-white/80 text-sm">F1 Score</Label>
                <div className="text-3xl font-bold mt-1">{currentDataset.statistics.f1Score}%</div>
              </div>
            </CardContent>
            {/*<CardFooter className="px-10>*/}
            {/*  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white ">Export Performance Report</Button>*/}
            {/*</CardFooter>*/}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default DatasetDetection