import React from 'react';

const DataTable = () => {
  return (
    <div className="w-full font-mono shadow-lg rounded-lg mb-10">
      <div className="flex justify-between text-sm">
        <div className="w-4/5">
          <div className="px-6 py-3 mb-1 bg-[#1e1e29] text-[#7b84ff]">Average Training Accuracy</div>
          <div className="px-6 py-3 mb-1 bg-[#1e1e29] text-white">Average Training Loss</div>
          <div className="px-6 py-3 mb-1 bg-[#1e1e29] text-[#7b84ff]">Average Validation Accuracy</div>
          <div className="px-6 py-3 mb-1 bg-[#1e1e29] text-white">Average Validation Loss</div>
        </div>
        <div className="w-1/5 text-right">
          <div className="px-6 py-3 mb-1 bg-[#1e1e29] text-[#7b84ff]">0.8297</div>
          <div className="px-6 py-3 mb-1 bg-[#1e1e29] text-white">0.8108</div>
          <div className="px-6 py-3 mb-1 bg-[#1e1e29] text-[#7b84ff]">0.4008</div>
          <div className="px-6 py-3 mb-1 bg-[#1e1e29] text-white">0.3961</div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
