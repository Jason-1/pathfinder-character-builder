"use client";

import React from "react";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "@/app/Slices/levelSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger className="inline-block w-full">
          <div className="inline-block border rounded-sm hover:border-red-700 p-2 w-full">
            Level {currentLevel}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Level</DialogTitle>
            <DialogClose asChild>
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
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LevelSelector;
