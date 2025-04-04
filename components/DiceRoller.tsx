import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { diceTypes } from "@/types";
import { motion } from "motion/react";
import { FaDiceD6, FaDiceD20 } from "react-icons/fa";
import { GiD4, GiD10, GiD12 } from "react-icons/gi";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { DCAdjustments, DCbyLevel } from "@/data";
import { Input } from "./ui/input";
interface DiceRollerProps {
  diceType: diceTypes;
  modifier: number;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ diceType, modifier }) => {
  const [adjustment, setAdjustment] = useState<string>("");

  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );

  /*
  export const DCAdjustments = {
    incrediblyEasy: -10,
    veryEasy: -5,
    easy: -2,
    hard: 2,
    veryHard: 5,
    incrediblyHard: 10,
  };*/

  const calculateDC = () => {
    var DC = DCbyLevel[currentLevel] || 0;
    var currentDCAdjustment = 0;
    // Add any adjustments selected here
    if (adjustment) {
      currentDCAdjustment = DCAdjustments[adjustment];
    }
    DC = DC + currentDCAdjustment;

    return DC;
  };

  const calculateSuccessLevel = (roll: number) => {
    var successLevel = 0;
    const DC = calculateDC();
    if (roll + modifier < DC - 10) {
      successLevel = 1;
    } else if (roll + modifier < DC) {
      successLevel = 2;
    } else if (roll + modifier >= DC + 10) {
      successLevel = 4;
    } else {
      successLevel = 3;
    }

    if (roll === 20) {
      successLevel = Math.min(successLevel + 1, 4);
    }
    if (roll === 1) {
      successLevel = Math.max(successLevel - 1, 1);
    }

    switch (successLevel) {
      case 1:
        return "Critical Failure";
      case 2:
        return "Failure";
      case 3:
        return "Success";
      case 4:
        return "Critical Success";
      default:
        return "Success";
    }
  };

  const handleDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      setRoll(null);
    }
  };

  const [roll, setRoll] = useState<number[] | null>(null);
  const max = parseInt(diceType.slice(1));

  const rollDice = () => {
    const result = Math.floor(Math.random() * max) + 1;
    setRoll((prevRolls) => [...(prevRolls || []), result]);
  };

  return (
    <div>
      <Dialog onOpenChange={handleDialogClose}>
        <DialogTrigger>
          <motion.div>
            {diceType === "d4" ? <GiD4 size={"22"} /> : null}
            {diceType === "d6" ? <FaDiceD6 size={"20"} /> : null}
            {diceType === "d8" ? <GiD10 size={"24"} /> : null}
            {diceType === "d10" ? <GiD10 size={"24"} /> : null}
            {diceType === "d12" ? <GiD12 size={"24"} /> : null}
            {diceType === "d20" ? <FaDiceD20 size={"20"} /> : null}
          </motion.div>
        </DialogTrigger>
        <DialogContent className="h-1/2 max-w-full w-1/2">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between items-center">
                <span>Dice Roller</span>
                <Input />
                <DropdownMenu>
                  <DropdownMenuTrigger className="font-normal">
                    DC Adjustment:{" "}
                    {adjustment === "incrediblyEasy"
                      ? "Incredibly Easy"
                      : adjustment === "veryEasy"
                      ? "Very Easy"
                      : adjustment === "easy"
                      ? "Easy"
                      : adjustment === "hard"
                      ? "Hard"
                      : adjustment === "veryHard"
                      ? "Very Hard"
                      : adjustment === "incrediblyHard"
                      ? "Incredibly Hard"
                      : "Normal"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setAdjustment("incrediblyEasy")}
                    >
                      Incredibly Easy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAdjustment("veryEasy")}>
                      Very Easy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAdjustment("easy")}>
                      Easy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAdjustment("")}>
                      Normal
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAdjustment("hard")}>
                      Hard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAdjustment("veryHard")}>
                      Very Hard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setAdjustment("incrediblyHard")}
                    >
                      Incredibly Hard
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={rollDice}>Roll Dice</Button>
              </div>
            </DialogTitle>

            <div className="overflow-y-auto max-h-96 py-2">
              {roll?.map((result, index) => (
                <div key={index} className={`flex `}>
                  <span className="mr-1">{"Result:"} </span>
                  <span
                    className={`mr-1  ${
                      result === 1
                        ? "text-red-700"
                        : result === max
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {result}
                  </span>
                  <span className="mr-1">+ {modifier} =</span>
                  <span
                    className={`${
                      calculateSuccessLevel(result) === "Critical Failure"
                        ? "text-red-700"
                        : calculateSuccessLevel(result) === "Failure"
                        ? "text-red-400"
                        : calculateSuccessLevel(result) === "Success"
                        ? "text-blue-500"
                        : calculateSuccessLevel(result) === "Critical Success"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {result + modifier}
                  </span>
                </div>
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiceRoller;
