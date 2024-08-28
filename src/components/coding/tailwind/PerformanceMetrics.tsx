import React from "react";

interface PerformanceMetricsProps {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
}

const PerformanceMetricsTailwind: React.FC<PerformanceMetricsProps> = ({
  wpm,
  accuracy,
  timeElapsed,
}) => {
  return (
    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h4 className="font-semibold text-gray-700">WPM</h4>
        <p className="text-2xl font-bold text-gray-800">{wpm}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h4 className="font-semibold text-gray-700">Accuracy</h4>
        <p className="text-2xl font-bold text-gray-800">
          {accuracy.toFixed(2)}%
        </p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h4 className="font-semibold text-gray-700">Time Elapsed</h4>
        <p className="text-2xl font-bold text-gray-800">{timeElapsed}s</p>
      </div>
    </div>
  );
};

export default PerformanceMetricsTailwind;
