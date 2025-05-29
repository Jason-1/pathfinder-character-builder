"use client";

import React from "react";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "@/app/redux/Slices/levelSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { selectLevel } from "@/app/redux/selectors";

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

const LevelSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedLevel = useSelector(selectLevel);

  //------------------------------------------------------------------------------//

  const handleSetLevel = (level: number) => {
    dispatch(setLevel(level));
  };

  return (
    <div className="flex justify-center items-center w-full lg:w-auto lg:h-auto">
      <Dialog>
        <DialogTrigger className="inline-block w-full max-w-[300px]">
          <div className="inline-block border rounded-sm hover:border-red-700 p-2 w-full">
            Level {selectedLevel}
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
                      level <= selectedLevel
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
