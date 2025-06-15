export const resnet50 = [
  { epoch: 1, trainingAccuracy: 0.6394, validationAccuracy: 0.8993, trainingLoss: 0.9707, validationLoss: 0.2727 },
  { epoch: 2, trainingAccuracy: 0.8750, validationAccuracy: 0.8993, trainingLoss: 0.3950, validationLoss: 0.2728 },
  { epoch: 3, trainingAccuracy: 0.8749, validationAccuracy: 0.9236, trainingLoss: 0.3533, validationLoss: 0.1892 },
  { epoch: 4, trainingAccuracy: 0.8750, validationAccuracy: 0.9201, trainingLoss: 0.3632, validationLoss: 0.1861 },
  { epoch: 5, trainingAccuracy: 0.9124, validationAccuracy: 0.9340, trainingLoss: 0.2322, validationLoss: 0.1636 },
  { epoch: 6, trainingAccuracy: 0.9688, validationAccuracy: 0.9375, trainingLoss: 0.1083, validationLoss: 0.1676 },
  { epoch: 7, trainingAccuracy: 0.9185, validationAccuracy: 0.9132, trainingLoss: 0.2021, validationLoss: 0.2092 },
  { epoch: 8, trainingAccuracy: 0.8750, validationAccuracy: 0.9097, trainingLoss: 0.3420, validationLoss: 0.2069 },
  { epoch: 9, trainingAccuracy: 0.9235, validationAccuracy: 0.9549, trainingLoss: 0.2017, validationLoss: 0.1248 },
  { epoch: 10, trainingAccuracy: 0.8438, validationAccuracy: 0.9583, trainingLoss: 0.2177, validationLoss: 0.1229 },
  { epoch: 11, trainingAccuracy: 0.9539, validationAccuracy: 0.9549, trainingLoss: 0.1472, validationLoss: 0.1321 },
  { epoch: 12, trainingAccuracy: 0.9375, validationAccuracy: 0.9549, trainingLoss: 0.1506, validationLoss: 0.1297 },
  { epoch: 13, trainingAccuracy: 0.9504, validationAccuracy: 0.9618, trainingLoss: 0.1353, validationLoss: 0.1207 },
  { epoch: 14, trainingAccuracy: 0.9062, validationAccuracy: 0.9653, trainingLoss: 0.2064, validationLoss: 0.1176 },
  { epoch: 15, trainingAccuracy: 0.9391, validationAccuracy: 0.9653, trainingLoss: 0.1558, validationLoss: 0.1098 },
  { epoch: 16, trainingAccuracy: 0.9688, validationAccuracy: 0.9653, trainingLoss: 0.1169, validationLoss: 0.1070 },
  { epoch: 17, trainingAccuracy: 0.9624, validationAccuracy: 0.9583, trainingLoss: 0.1185, validationLoss: 0.1164 },
  { epoch: 18, trainingAccuracy: 0.9375, validationAccuracy: 0.9583, trainingLoss: 0.1936, validationLoss: 0.1204 },
  { epoch: 19, trainingAccuracy: 0.9635, validationAccuracy: 0.9618, trainingLoss: 0.1046, validationLoss: 0.1127 },
  { epoch: 20, trainingAccuracy: 0.9688, validationAccuracy: 0.9618, trainingLoss: 0.0525, validationLoss: 0.1181 }
]

export const resnet50ClassificationReport = {
  accuracy: 0.93,
  macroAvg: { precision: 0.93, recall: 0.93, f1Score: 0.93 },
  weightedAvg: { precision: 0.93, recall: 0.93, f1Score: 0.93 },
  classes: [
    { label: "clusters", precision: 0.90, recall: 0.99, f1Score: 0.94, support: 94 },
    { label: "galaxies", precision: 0.90, recall: 0.94, f1Score: 0.92, support: 95 },
    { label: "nebulae", precision: 0.95, recall: 0.92, f1Score: 0.94, support: 102 },
    { label: "other", precision: 0.97, recall: 0.87, f1Score: 0.91, support: 98 }
  ]
}
