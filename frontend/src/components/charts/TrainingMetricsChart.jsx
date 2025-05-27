"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function TrainingMetricsChart({ modelName, data }) {
  return (
    <div className="w-full p-8 bg-transparent">
      <div className="bg-transparent mb-20">
        <h2 className="text-white text-xl mb-4 text-center"><b>ACCURACY</b> for Training and Validation </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="epoch"
              stroke="#fff"
              tick={{ fill: "#fff" }}
              label={{
                value: "Epoch",
                position: "insideBottom",
                offset: -10,
                style: { textAnchor: "middle", fill: "#fff" },
              }}
            />
            <YAxis
              domain={["auto", "auto"]}
              stroke="#fff"
              tick={{ fill: "#fff" }}
              label={{
                value: "Accuracy",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: "#fff" },
              }}
            />
            <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "4px", color: "#fff" }} />
            <Legend wrapperStyle={{ color: "#fff", paddingTop: 25 }} />
            <Line type="monotone" dataKey="trainingAccuracy" stroke="#3b82f6" strokeWidth={2} name="Training Accuracy" dot={{ r: 2 }} />
            <Line type="monotone" dataKey="validationAccuracy" stroke="#f97316" strokeWidth={2} name="Validation Accuracy" dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Loss Chart */}
      <div className="bg-transparent">
        <h2 className="text-white text-xl mb-4 text-center"><b>LOSS</b> for Training and Validation</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="epoch"
              stroke="#fff"
              tick={{ fill: "#fff" }}
              label={{
                value: "Epoch",
                position: "insideBottom",
                offset: -10,
                style: { textAnchor: "middle", fill: "#fff" },
              }}
            />
            <YAxis
              domain={["auto", "auto"]}
              stroke="#fff"
              tick={{ fill: "#fff" }}
              label={{
                value: "Loss",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: "#fff" },
              }}
            />
            <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "4px", color: "#fff" }} />
            <Legend wrapperStyle={{ color: "#fff", paddingTop: 25 }} />
            <Line type="monotone" dataKey="trainingLoss" stroke="#3b82f6" strokeWidth={2} name="Training Loss" dot={{ r: 2 }} />
            <Line type="monotone" dataKey="validationLoss" stroke="#f97316" strokeWidth={2} name="Validation Loss" dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
