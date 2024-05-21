import React from "react";

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress = ({ percentage }: CircularProgressProps) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
      <circle
        className="text-gray-300 "
        strokeWidth="10"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
      />
      <circle
        className="text-green-500 "
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
      />
    </svg>
  );
};

export default CircularProgress;
