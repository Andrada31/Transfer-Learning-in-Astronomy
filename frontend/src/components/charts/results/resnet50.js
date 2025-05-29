// components/charts/results/resnet50.js

export const resnet50 = [
  { epoch: 1, trainingAccuracy: 0.5562, validationAccuracy: 0.8958, trainingLoss: 1.1720, validationLoss: 0.3161 },
  { epoch: 2, trainingAccuracy: 0.8125, validationAccuracy: 0.9028, trainingLoss: 0.5682, validationLoss: 0.3118 },
  { epoch: 3, trainingAccuracy: 0.8570, validationAccuracy: 0.9167, trainingLoss: 0.4029, validationLoss: 0.2354 },
  { epoch: 4, trainingAccuracy: 0.9062, validationAccuracy: 0.9236, trainingLoss: 0.1888, validationLoss: 0.2326 },
  { epoch: 5, trainingAccuracy: 0.8689, validationAccuracy: 0.9306, trainingLoss: 0.3070, validationLoss: 0.2031 },
  { epoch: 6, trainingAccuracy: 0.9688, validationAccuracy: 0.9271, trainingLoss: 0.2012, validationLoss: 0.2009 },
  { epoch: 7, trainingAccuracy: 0.8947, validationAccuracy: 0.9340, trainingLoss: 0.2955, validationLoss: 0.2153 },
  { epoch: 8, trainingAccuracy: 0.9375, validationAccuracy: 0.9340, trainingLoss: 0.2781, validationLoss: 0.2197 },
  { epoch: 9, trainingAccuracy: 0.9184, validationAccuracy: 0.9375, trainingLoss: 0.2281, validationLoss: 0.1738 },
  { epoch: 10, trainingAccuracy: 0.9062, validationAccuracy: 0.9410, trainingLoss: 0.4055, validationLoss: 0.1706 },
  { epoch: 11, trainingAccuracy: 0.9409, validationAccuracy: 0.9410, trainingLoss: 0.1966, validationLoss: 0.1714 },
  { epoch: 12, trainingAccuracy: 0.9062, validationAccuracy: 0.9410, trainingLoss: 0.2331, validationLoss: 0.1699 },
  { epoch: 13, trainingAccuracy: 0.9359, validationAccuracy: 0.9306, trainingLoss: 0.1838, validationLoss: 0.1553 },
  { epoch: 14, trainingAccuracy: 1.0000, validationAccuracy: 0.9340, trainingLoss: 0.0392, validationLoss: 0.1541 },
  { epoch: 15, trainingAccuracy: 0.9258, validationAccuracy: 0.9375, trainingLoss: 0.1884, validationLoss: 0.1429 },
  { epoch: 16, trainingAccuracy: 0.9375, validationAccuracy: 0.9410, trainingLoss: 0.3903, validationLoss: 0.1391 },
  { epoch: 17, trainingAccuracy: 0.9618, validationAccuracy: 0.9583, trainingLoss: 0.1213, validationLoss: 0.1248 },
  { epoch: 18, trainingAccuracy: 0.9062, validationAccuracy: 0.9618, trainingLoss: 0.2847, validationLoss: 0.1253 },
  { epoch: 19, trainingAccuracy: 0.9591, validationAccuracy: 0.9444, trainingLoss: 0.1394, validationLoss: 0.1326 },
  { epoch: 20, trainingAccuracy: 0.9688, validationAccuracy: 0.9444, trainingLoss: 0.0786, validationLoss: 0.1300 },
]

export const resnet50ClassificationReport = {
  accuracy: 0.93,
  macroAvg: { precision: 0.93, recall: 0.93, f1Score: 0.93 },
  weightedAvg: { precision: 0.93, recall: 0.93, f1Score: 0.93 },
  classes: [
    { label: "clusters", precision: 0.90, recall: 0.98, f1Score: 0.94, support: 94 },
    { label: "galaxies", precision: 0.92, recall: 0.93, f1Score: 0.92, support: 95 },
    { label: "nebulae", precision: 0.92, recall: 0.93, f1Score: 0.93, support: 102 },
    { label: "other", precision: 0.97, recall: 0.87, f1Score: 0.91, support: 98 },
  ]
}
