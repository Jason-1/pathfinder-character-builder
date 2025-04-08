import React from "react";

const TrainingIcon: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <span className="border px-2 rounded-full border-red-500 bg-red-600 h-6 w-6 flex items-center justify-center">
      {children}
    </span>
  );
};

export default TrainingIcon;
