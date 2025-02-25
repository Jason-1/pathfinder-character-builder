"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

interface LevelSelectorProps {
  selectedLevel: number;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  setSelectedLevel,
}) => {
  return (
    <div className="grid grid-cols-4 gap-1 mt-6">
      {levels.map((level) => (
        <Button
          variant="default"
          key={level}
          className={`col-span-1 ${
            level <= selectedLevel
              ? "opacity-100 border-black text-white"
              : "opacity-80"
          }`}
          onClick={() => setSelectedLevel(level)}
        >
          {level}
        </Button>
      ))}
    </div>
  );
};

export default LevelSelector;
