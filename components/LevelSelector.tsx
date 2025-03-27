"use client";

import React from "react";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "@/app/levelSlice";

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

interface LevelSelectorProps {
  selectedLevel: number;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  setSelectedLevel,
}) => {
  const dispatch = useDispatch();

  const currentLevel = useSelector((state: any) => state.level.level);

  const handleSetLevel = (level: number) => {
    setSelectedLevel(level);
    dispatch(setLevel({ level }));
  };

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
          onClick={() => handleSetLevel(level)}
        >
          {level}
        </Button>
      ))}

      <h1 className="text-center">{currentLevel}</h1>
    </div>
  );
};

export default LevelSelector;
