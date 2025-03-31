"use client";

import React from "react";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "@/app/Slices/levelSlice";

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

const LevelSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );

  const handleSetLevel = (level: number) => {
    dispatch(setLevel({ level }));
  };

  return (
    <div className="grid grid-cols-4 gap-1 mt-6">
      {levels.map((level) => (
        <Button
          variant="default"
          key={level}
          className={`col-span-1 ${
            level <= currentLevel
              ? "opacity-100 border-black text-white"
              : "opacity-80"
          }`}
          onClick={() => handleSetLevel(level)}
        >
          {level}
        </Button>
      ))}
    </div>
  );
};

export default LevelSelector;
