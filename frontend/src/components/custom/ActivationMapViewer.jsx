"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export default function ActivationMapViewer({ activationMapUrls }) {
  const [activeLayer, setActiveLayer] = useState(1);
  const totalLayers = activationMapUrls.length;

  const handleLayerChange = (value) => {
    setActiveLayer(value[0]);
  };

  const layerFeatures = {
    1: ["Edge detection", "Simple patterns", "Basic textures"],
    2: ["Corners and contours", "Color blobs", "Simple shapes"],
    3: ["Textures", "Complex patterns", "Part compositions"],
    4: ["Object parts", "Complex shapes", "Higher-level features"],
    5: ["Object compositions", "Scene elements", "Abstract concepts"],
  };

  const isActive = activationMapUrls[activeLayer - 1];

  return (
    <Card className="p-6 border-none">
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="rounded-md overflow-hidden">
            {isActive ? (
              <img
                src={activationMapUrls[activeLayer - 1]}
                alt={`Activation map for layer ${activeLayer}`}
                className="w-[300px] h-[300px] object-cover"
              />
            ) : (
              <div className="w-[300px] h-[300px] bg-transparent flex flex-col items-center justify-center text-gray-400">
                <BrainCircuit className="w-20 h-20 mb-10 text-white" />
                <p className="text-md text-center">Activation map inactive</p>
              </div>
            )}
          </div>
        </div>

        {isActive && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Convolutional Layer:</span>
                <span className="text-sm font-medium">{activeLayer}</span>
              </div>
              <Slider
                value={[activeLayer]}
                min={1}
                max={totalLayers}
                step={1}
                onValueChange={handleLayerChange}
                className="w-full"
              />
            </div>

            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Layer {activeLayer} activation features:</p>
              <ul className="list-disc pl-5 space-y-1">
                {layerFeatures[activeLayer]?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
