import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Epoch 0', loss: 0.50, accuracy: 70.0 },  // Adding Epoch 0
  { name: 'Epoch 100', loss: 0.45, accuracy: 72.5 },
  { name: 'Epoch 200', loss: 0.35, accuracy: 76.3 },
  { name: 'Epoch 300', loss: 0.28, accuracy: 79.1 },
  { name: 'Epoch 400', loss: 0.23, accuracy: 81.0 },
  { name: 'Epoch 500', loss: 0.18, accuracy: 83.5 },
  { name: 'Epoch 600', loss: 0.15, accuracy: 85.2 },
  { name: 'Epoch 700', loss: 0.12, accuracy: 86.7 },
];

const LineChartComponent = () => {
  return (
    <div className="mt-20 mb-5">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 'dataMax + 0.1']} /> {/* Zoomed-in view */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="loss" stroke="#ff7f0e" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="accuracy" stroke="#5298e3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
