import React from "react";

interface TrainingIconProps {
  trainingLevel: string | number;
}

const TrainingIcon: React.FC<TrainingIconProps> = ({ trainingLevel }) => {
  return (
    <span
      className={`border px-2 rounded-full h-6 w-6 flex items-center justify-center ${
        trainingLevel === "U"
          ? "border-gray-500 bg-gray-600"
          : trainingLevel === "T"
          ? "border-blue-500 bg-blue-600"
          : trainingLevel === "E"
          ? "border-purple-500 bg-purple-700"
          : trainingLevel === "M"
          ? "border-yellow-500 bg-yellow-600"
          : trainingLevel === "L"
          ? "border-red-500 bg-red-600"
          : ""
      } `}
    >
      {trainingLevel}
    </span>
  );
};

export default TrainingIcon;
