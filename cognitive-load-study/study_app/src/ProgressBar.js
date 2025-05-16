import React from 'react';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Start</span>
        <span>Progress: {Math.round(percentage)}%</span>
        <span>Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;