import React from "react";

interface TrainingIconProps {
  trainingLevel: string | number;
}

const TrainingIcon: React.FC<TrainingIconProps> = ({ trainingLevel }) => {
  const calculateColour = () => {
    switch (trainingLevel) {
      case "U":
        return "border-gray-500 bg-gray-600";
      case "T":
        return "border-blue-500 bg-blue-600";
      case "E":
        return "border-purple-500 bg-purple-700";
      case "M":
        return "border-yellow-500 bg-yellow-600";
      case "L":
        return "border-red-500 bg-red-600";
      default:
        return "";
    }
  };

  return (
    <span
      className={`border px-2 rounded-full h-6 w-6 flex items-center justify-center ${calculateColour()}`}
    >
      {trainingLevel}
    </span>
  );
};

export default TrainingIcon;
