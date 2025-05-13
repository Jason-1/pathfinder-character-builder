import { cn } from "@/lib/utils";
import React from "react";

interface TrainingIconProps {
  trainingLevel: string;
  size?: number;
  className?: string;
}

const TrainingIcon: React.FC<TrainingIconProps> = ({
  trainingLevel,
  size,
  className,
}) => {
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
      className={cn(
        `border px-2 rounded-full flex items-center justify-center h-${
          size || 6
        } w-${size || 6} ${calculateColour()} ${
          size ? (size <= 4 ? "text-xs" : "text-sm") : "text-md"
        }`,
        className
      )}
    >
      {trainingLevel}
    </span>
  );
};

export default TrainingIcon;
