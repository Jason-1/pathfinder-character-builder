import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { skillIncreaseLevels } from "@/data";

interface SkillIncreaseProps {
  currentLevel: number;
  selectedBackground: string;
  selectedClass: string;
}

const SkillIncreases: React.FC<SkillIncreaseProps> = ({
  currentLevel,
  selectedBackground,
  selectedClass,
}) => {
  return (
    <>
      {currentLevel === 1 && (
        <Dialog>
          <DialogTrigger>Initial Skill Proficiencies</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Allocate Skill Proficiencies</DialogTitle>
              <DialogDescription>
                <div>Acrobatics</div>
                <div>Arcana</div>
                <div>Athletics</div>
                <div>Crafting</div>
                <div>Deception</div>
                <div>Diplomacy</div>
                <div>Intimidation</div>
                <div>Medicine</div>
                <div>Nature</div>
                <div>Occultism</div>
                <div>Performance</div>
                <div>Religion</div>
                <div>Society</div>
                <div>Stealth</div>
                <div>Survival</div>
                <div>Thievery</div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      {skillIncreaseLevels.includes(currentLevel) && <div>Skill Increase</div>}
    </>
  );
};

export default SkillIncreases;
