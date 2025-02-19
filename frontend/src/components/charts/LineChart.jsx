import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ep 0', loss: 0.95, accuracy: 0.30 },
  { name: 'Ep 5', loss: 0.75, accuracy: 0.50 },
  { name: 'Ep 10', loss: 0.60, accuracy: 0.65 },
  { name: 'Ep 15', loss: 0.45, accuracy: 0.78 },
  { name: 'Ep 20', loss: 0.35, accuracy: 0.85 },
  { name: 'Ep 25', loss: 0.28, accuracy: 0.89 },
  { name: 'Ep 30', loss: 0.22, accuracy: 0.92 },
];

const LineChartComponent = () => {
  return (
    <div className="mt-20 mb-5">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 1]} /> {/* Focuses on 0 to 1 range for better contrast */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="loss" stroke="#ff7f0f" strokeWidth={2} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="accuracy" stroke="#5298e3" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
