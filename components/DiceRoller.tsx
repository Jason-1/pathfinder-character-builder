import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { diceTypes } from "@/types";
import { motion } from "motion/react";
import { FaDiceD20 } from "react-icons/fa";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { DCAdjustments, DCbyLevel } from "@/data";
import { Input } from "./ui/input";
interface DiceRollerProps {
  diceType: diceTypes;
  modifier: number;
  diceCount?: number;
  damageModifier?: number;
}
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import DiceTray from "./3dElements/DiceTray";

const DiceRoller: React.FC<DiceRollerProps> = ({
  diceType,
  modifier,
  diceCount,
  damageModifier,
}) => {
  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );

  const [adjustment, setAdjustment] = useState<string>("");
  const [DC, setDC] = useState<number>(0);
  const [level, setLevel] = useState<number>(currentLevel);
  const [manualDC, setManualDC] = useState(false);
  const [manualLevel, setManualLevel] = useState(false);
  const [roll, setRoll] = useState<
    { dice: string; rolls: number[]; critical?: boolean; MAP?: number }[] | null
  >(null);

  const MAP1: number = 5;
  const MAP2: number = 10;

  useEffect(() => {
    if (!manualDC) {
      let baseDC = DCbyLevel[level] || 0;

      let currentDCAdjustment = 0;
      // Add any adjustments selected here
      if (adjustment) {
        currentDCAdjustment = DCAdjustments[adjustment];
      }
      baseDC = baseDC + currentDCAdjustment;

      setDC(baseDC);
      if (!manualLevel) {
        setLevel(currentLevel);
      }
    }
  }, [adjustment, currentLevel, level, manualDC, manualLevel]);

  const handleDCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualDC(true);
    setDC(Number(e.target.value) || 0);
  };

  const handleLevelChange = (level: number) => {
    setManualDC(false);
    if (level === 0) {
      setManualLevel(false);
      setLevel(currentLevel);
    } else {
      setManualLevel(true);
      setLevel(level);
    }
  };

  const calculateSuccessColour = (currentRoll: number) => {
    let successLevel = 0;

    if (currentRoll + modifier < DC - 10) {
      successLevel = 1;
    } else if (currentRoll + modifier < DC) {
      successLevel = 2;
    } else if (currentRoll + modifier >= DC + 10) {
      successLevel = 4;
    } else {
      successLevel = 3;
    }

    if (currentRoll === 20) {
      successLevel = Math.min(successLevel + 1, 4);
    }
    if (currentRoll === 1) {
      successLevel = Math.max(successLevel - 1, 1);
    }

    switch (successLevel) {
      case 1:
        return "text-red-700";
      case 2:
        return "text-red-400";
      case 3:
        return "text-blue-500";

      case 4:
        return "text-green-500";
      default:
        return "";
    }
  };

  const handleDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      setRoll(null);
    }
  };

  const maxDiceRoll = 20;
  const maxDamageRoll = parseInt(diceType.slice(1));

  const rollDice = (MAP?: number) => {
    const rolls: number[] = [];

    const result = Math.floor(Math.random() * maxDiceRoll) + 1;
    rolls.push(result);

    //set Multiple Attack Penalty
    if (!MAP) {
      setRoll((prevRolls) => [...(prevRolls || []), { dice: "d20", rolls }]);
    } else {
      setRoll((prevRolls) => [
        ...(prevRolls || []),
        { dice: "d20", rolls, MAP: MAP === 1 ? MAP1 : MAP === 2 ? MAP2 : MAP },
      ]);
    }
  };

  const rollDamage = (critical: boolean) => {
    const rolls: number[] = [];
    for (let i = 0; i < (diceCount || 1); i++) {
      const result = Math.floor(Math.random() * maxDamageRoll) + 1;
      rolls.push(result);
    }
    setRoll((prevRolls) => [
      ...(prevRolls || []),
      { dice: diceType, rolls, critical },
    ]);
  };

  return (
    <div>
      <Dialog onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          <motion.div className="hover:cursor-pointer">
            <FaDiceD20 size={"20"} />
          </motion.div>
        </DialogTrigger>
        <DialogContent className="flex flex-col h-full max-w-full w-1/2 max-h-[75vh]">
          <DialogHeader className="flex-grow">
            <DialogTitle>
              <div className="flex justify-between items-center">
                <span>Dice Roller</span>
                {diceType === "d20" && (
                  <>
                    <Popover>
                      <PopoverTrigger className="font-normal">
                        Current DC Level: {level}
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="grid grid-cols-5 justify-between items-center text-center gap-1">
                          <PopoverClose asChild>
                            <Button
                              variant={"outline"}
                              className="flex justify-center items-center mt-1 col-span-5 cursor-pointer"
                              onClick={() => handleLevelChange(0)}
                            >
                              Current Level
                            </Button>
                          </PopoverClose>
                          {Array.from({ length: 20 }, (_, i) => (
                            <PopoverClose key={i} asChild>
                              <Button
                                variant={"outline"}
                                className="flex justify-center items-center mt-1 col-span-1 cursor-pointer"
                                onClick={() => handleLevelChange(i + 1)}
                              >
                                {i + 1}
                              </Button>
                            </PopoverClose>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div className="flex items-center gap-2">
                      <label className="font-normal">DC: </label>
                      <Input
                        type="number"
                        value={DC}
                        onChange={handleDCChange}
                        className="w-40"
                      />
                    </div>
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
                          onClick={() => {
                            setManualDC(false);
                            setAdjustment("incrediblyEasy");
                          }}
                        >
                          Incredibly Easy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setManualDC(false);
                            setAdjustment("veryEasy");
                          }}
                        >
                          Very Easy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setManualDC(false);
                            setAdjustment("easy");
                          }}
                        >
                          Easy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setManualDC(false);
                            setAdjustment("");
                          }}
                        >
                          Normal
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setManualDC(false);
                            setAdjustment("hard");
                          }}
                        >
                          Hard
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setManualDC(false);
                            setAdjustment("veryHard");
                          }}
                        >
                          Very Hard
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setManualDC(false);
                            setAdjustment("incrediblyHard");
                          }}
                        >
                          Incredibly Hard
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-[1fr_auto] gap-4 items-start justify-between flex-grow h-full overflow-y-auto border border-red-600">
            <div className="border border-purple-600 h-full">
              <DiceTray />
            </div>
            <div className="border border-yellow-600 flex flex-col h-full overflow-y-auto xl:w-[400px]">
              <div className="flex-grow border border-green-500 overflow-y-auto">
                {roll?.map((results, index) => (
                  <div key={index}>
                    <span>Result: </span>
                    {results.dice === "d20" && (
                      <>
                        <span
                          className={`mr-1  ${
                            results.rolls[0] === 1
                              ? "text-red-700"
                              : results.rolls[0] === maxDiceRoll
                              ? "text-green-500"
                              : ""
                          }`}
                        >
                          {results.rolls}
                        </span>
                        <span>
                          {"+ "}
                          {modifier - (results.MAP || 0)}
                          {" = "}
                        </span>
                        <span
                          className={`${
                            diceType === "d20"
                              ? calculateSuccessColour(
                                  results.rolls[0] + modifier
                                )
                              : ""
                          }`}
                        >
                          {results.rolls[0] + modifier - (results.MAP || 0)}
                        </span>
                      </>
                    )}

                    {results.dice !== "d20" && (
                      <>
                        {results.critical && "{Critical x2} "}
                        {results.rolls.map((result, i) => (
                          <React.Fragment key={i}>
                            <span
                              className={`${
                                result === 1
                                  ? "text-red-700"
                                  : result === maxDamageRoll
                                  ? "text-green-500"
                                  : ""
                              }`}
                            >
                              {result}
                            </span>
                            <span>{" + "}</span>
                          </React.Fragment>
                        ))}
                        <span>
                          {damageModifier}
                          {" = "}
                          {(results.rolls.reduce((a, b) => a + b, 0) +
                            (damageModifier || 0)) *
                            (results.critical ? 2 : 1)}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {diceType === "d20" && (
                <div className="mt-2 flex justify-end gap-6">
                  <Button onClick={() => rollDice}>Roll Dice</Button>
                </div>
              )}
              {diceType !== "d20" && (
                <div className="mt-2 flex flex-col justify-end gap-2">
                  <div className=" flex flex-row justify-end gap-4">
                    <Button onClick={() => rollDice(0)}>
                      Attack +{modifier}
                    </Button>
                    <Button onClick={() => rollDice(1)}>
                      Attack +{modifier - MAP1}
                    </Button>
                    <Button onClick={() => rollDice(2)}>
                      {" "}
                      Attack +{modifier - MAP2}
                    </Button>
                  </div>
                  <div className=" flex flex-row justify-end gap-4">
                    <Button onClick={() => rollDamage(false)}>Damage</Button>
                    <Button onClick={() => rollDamage(true)}>Critical</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiceRoller;
