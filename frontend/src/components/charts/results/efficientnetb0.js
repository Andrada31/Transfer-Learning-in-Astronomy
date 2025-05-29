// components/charts/results/efficientnetb0.js

export const efficientnetb0 = [
  { epoch: 1, trainingAccuracy: 0.6381, validationAccuracy: 0.8842, trainingLoss: 0.8699, validationLoss: 0.4231 },
  { epoch: 2, trainingAccuracy: 0.8735, validationAccuracy: 0.9068, trainingLoss: 0.3376, validationLoss: 0.3156 },
  { epoch: 3, trainingAccuracy: 0.8797, validationAccuracy: 0.9068, trainingLoss: 0.2895, validationLoss: 0.2973 },
  { epoch: 4, trainingAccuracy: 0.9006, validationAccuracy: 0.9132, trainingLoss: 0.2674, validationLoss: 0.2556 },
  { epoch: 5, trainingAccuracy: 0.9153, validationAccuracy: 0.8842, trainingLoss: 0.2172, validationLoss: 0.3005 },
  { epoch: 6, trainingAccuracy: 0.9183, validationAccuracy: 0.9035, trainingLoss: 0.2402, validationLoss: 0.2452 },
  { epoch: 7, trainingAccuracy: 0.9364, validationAccuracy: 0.9100, trainingLoss: 0.1906, validationLoss: 0.2053 },
  { epoch: 8, trainingAccuracy: 0.9303, validationAccuracy: 0.9196, trainingLoss: 0.2094, validationLoss: 0.2044 },
  { epoch: 9, trainingAccuracy: 0.9359, validationAccuracy: 0.9196, trainingLoss: 0.1807, validationLoss: 0.1977 },
  { epoch: 10, trainingAccuracy: 0.9421, validationAccuracy: 0.9357, trainingLoss: 0.1687, validationLoss: 0.1912 },
  { epoch: 11, trainingAccuracy: 0.9595, validationAccuracy: 0.9389, trainingLoss: 0.1216, validationLoss: 0.1499 },
  { epoch: 12, trainingAccuracy: 0.9552, validationAccuracy: 0.9518, trainingLoss: 0.1187, validationLoss: 0.1578 },
  { epoch: 13, trainingAccuracy: 0.9495, validationAccuracy: 0.9453, trainingLoss: 0.1311, validationLoss: 0.1513 },
  { epoch: 14, trainingAccuracy: 0.9560, validationAccuracy: 0.9486, trainingLoss: 0.1261, validationLoss: 0.1354 },
  { epoch: 15, trainingAccuracy: 0.9425, validationAccuracy: 0.9421, trainingLoss: 0.1554, validationLoss: 0.1479 },
  { epoch: 16, trainingAccuracy: 0.9420, validationAccuracy: 0.9453, trainingLoss: 0.1403, validationLoss: 0.1641 },
  { epoch: 17, trainingAccuracy: 0.9698, validationAccuracy: 0.9453, trainingLoss: 0.0882, validationLoss: 0.1599 },
  { epoch: 18, trainingAccuracy: 0.9587, validationAccuracy: 0.9486, trainingLoss: 0.1089, validationLoss: 0.1455 },
  { epoch: 19, trainingAccuracy: 0.9613, validationAccuracy: 0.9582, trainingLoss: 0.1089, validationLoss: 0.1191 },
  { epoch: 20, trainingAccuracy: 0.9680, validationAccuracy: 0.9614, trainingLoss: 0.0839, validationLoss: 0.1427 }
]

export const efficientnetb0ClassificationReport = {
  accuracy: 0.946,
  macroAvg: { precision: 0.94, recall: 0.94, f1Score: 0.94 },
  weightedAvg: { precision: 0.94, recall: 0.95, f1Score: 0.94 },
  classes: [
    { label: "clusters", precision: 0.94, recall: 0.88, f1Score: 0.91, support: 94 },
    { label: "galaxies", precision: 0.91, recall: 0.99, f1Score: 0.95, support: 95 },
    { label: "nebulae", precision: 0.94, recall: 0.92, f1Score: 0.93, support: 102 },
    { label: "other", precision: 0.94, recall: 0.96, f1Score: 0.95, support: 98 },
  ]
}
