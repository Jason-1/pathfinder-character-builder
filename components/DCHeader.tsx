import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DCControlsProps {
  level: number;
  DC: number;
  adjustment: string;
  handleLevelChange: (level: number) => void;
  handleDCChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setManualDC: (value: boolean) => void;
  setAdjustment: (value: string) => void;
}

const DCControls: React.FC<DCControlsProps> = ({
  level,
  DC,
  adjustment,
  handleLevelChange,
  handleDCChange,
  setManualDC,
  setAdjustment,
}) => {
  return (
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
  );
};

export default DCControls;
