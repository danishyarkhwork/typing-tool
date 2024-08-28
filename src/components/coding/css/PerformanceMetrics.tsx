import React from "react";

interface PerformanceMetricsProps {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
}

const PerformanceMetricsCSS: React.FC<PerformanceMetricsProps> = ({
  wpm,
  accuracy,
  timeElapsed,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4 flex justify-between">
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy.toFixed(2)}%</p>
      <p>Time: {timeElapsed}s</p>
    </div>
  );
};

export default PerformanceMetricsCSS;
