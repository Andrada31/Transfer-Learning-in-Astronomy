export const vgg16 = [
  { epoch: 1, trainingAccuracy: 0.2726, validationAccuracy: 0.4405, trainingLoss: 4.0809, validationLoss: 1.3399 },
  { epoch: 2, trainingAccuracy: 0.4655, validationAccuracy: 0.6077, trainingLoss: 2.2274, validationLoss: 0.9836 },
  { epoch: 3, trainingAccuracy: 0.5919, validationAccuracy: 0.7010, trainingLoss: 1.6188, validationLoss: 0.7764 },
  { epoch: 4, trainingAccuracy: 0.6133, validationAccuracy: 0.7363, trainingLoss: 1.2852, validationLoss: 0.7013 },
  { epoch: 5, trainingAccuracy: 0.7170, validationAccuracy: 0.7653, trainingLoss: 0.9901, validationLoss: 0.6141 },
  { epoch: 6, trainingAccuracy: 0.7311, validationAccuracy: 0.8039, trainingLoss: 0.9541, validationLoss: 0.5517 },
  { epoch: 7, trainingAccuracy: 0.7404, validationAccuracy: 0.8199, trainingLoss: 0.8419, validationLoss: 0.5161 },
  { epoch: 8, trainingAccuracy: 0.7637, validationAccuracy: 0.8296, trainingLoss: 0.7736, validationLoss: 0.4899 },
  { epoch: 9, trainingAccuracy: 0.8120, validationAccuracy: 0.8424, trainingLoss: 0.6434, validationLoss: 0.4686 },
  { epoch: 10, trainingAccuracy: 0.7870, validationAccuracy: 0.8424, trainingLoss: 0.6451, validationLoss: 0.4457 },
  { epoch: 11, trainingAccuracy: 0.8194, validationAccuracy: 0.8489, trainingLoss: 0.5694, validationLoss: 0.4326 },
  { epoch: 12, trainingAccuracy: 0.8030, validationAccuracy: 0.8553, trainingLoss: 0.5842, validationLoss: 0.4196 },
  { epoch: 13, trainingAccuracy: 0.8199, validationAccuracy: 0.8457, trainingLoss: 0.4577, validationLoss: 0.4080 },
  { epoch: 14, trainingAccuracy: 0.8226, validationAccuracy: 0.8457, trainingLoss: 0.5104, validationLoss: 0.4025 },
  { epoch: 15, trainingAccuracy: 0.8194, validationAccuracy: 0.8585, trainingLoss: 0.5372, validationLoss: 0.3877 },
  { epoch: 16, trainingAccuracy: 0.8354, validationAccuracy: 0.8585, trainingLoss: 0.4860, validationLoss: 0.3837 },
  { epoch: 17, trainingAccuracy: 0.8490, validationAccuracy: 0.8650, trainingLoss: 0.4486, validationLoss: 0.3813 },
  { epoch: 18, trainingAccuracy: 0.8616, validationAccuracy: 0.8714, trainingLoss: 0.4012, validationLoss: 0.3733 },
  { epoch: 19, trainingAccuracy: 0.8620, validationAccuracy: 0.8682, trainingLoss: 0.4172, validationLoss: 0.3676 },
  { epoch: 20, trainingAccuracy: 0.8556, validationAccuracy: 0.8714, trainingLoss: 0.4206, validationLoss: 0.3626 },
]

export const vgg16ClassificationReport = {
  accuracy: 0.9023,
  macroAvg: { precision: 0.90, recall: 0.90, f1Score: 0.90 },
  weightedAvg: { precision: 0.90, recall: 0.90, f1Score: 0.90 },
  classes: [
    { label: "clusters", precision: 0.94, recall: 0.87, f1Score: 0.91, support: 94 },
    { label: "galaxies", precision: 0.91, recall: 0.92, f1Score: 0.91, support: 95 },
    { label: "nebulae", precision: 0.90, recall: 0.94, f1Score: 0.92, support: 102 },
    { label: "other", precision: 0.87, recall: 0.88, f1Score: 0.87, support: 98 },
  ]
}
