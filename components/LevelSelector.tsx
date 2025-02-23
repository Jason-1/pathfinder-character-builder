"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

const LevelSelector = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-4 gap-1 mt-6">
      {levels.map((level) => (
        <Button
          variant="default"
          key={level}
          className={`col-span-1 ${
            selectedLevel === level
              ? "opacity-100 border-black text-white"
              : "opacity-80"
          }`}
          onClick={() => (setSelectedLevel(level), console.log(level))}
        >
          {level}
        </Button>
      ))}
    </div>
  );
};

export default LevelSelector;
