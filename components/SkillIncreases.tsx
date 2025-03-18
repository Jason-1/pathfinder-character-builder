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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { skillProficienciesType, skillTypes } from "@/types";

interface SkillIncreaseProps {
  currentLevel: number;
  selectedBackground: string;
  selectedClass: string;
  availableBoosts: number;
  selectedSkills: skillProficienciesType[];
  setSelectedSkills: React.Dispatch<
    React.SetStateAction<skillProficienciesType[]>
  >;
}

const SkillIncreases: React.FC<SkillIncreaseProps> = ({
  currentLevel,
  selectedBackground,
  selectedClass,
  availableBoosts,
  selectedSkills,
  setSelectedSkills,
}) => {
  function findDefaultValue(LevelsBoosted: number[]) {
    const boostsAtCurrentLevel = LevelsBoosted.filter(
      (level) => level <= currentLevel
    );

    switch (boostsAtCurrentLevel.length) {
      case 0:
        return "Untrained";
      case 1:
        return "Trained";
      case 2:
        return "Expert";
      case 3:
        return "Master";
      case 4:
        return "Legendary";
      default:
        return "Untrained";
    }
  }

  const handleRadioChange = (skill: skillTypes | "") => {
    setSelectedSkills((prevSkills) =>
      prevSkills.map((skillBoost) =>
        skillBoost.skill === skill
          ? {
              ...skillBoost,
              LevelsBoosted: [...skillBoost.LevelsBoosted, currentLevel],
            }
          : skillBoost
      )
    );
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>Initial Skill Proficiencies</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Allocate Skill Proficiencies</DialogTitle>
            <DialogDescription>
              {selectedSkills.map((skillBoost) => (
                <div key={skillBoost.skill} className="mt-4">
                  {skillBoost.skill}{" "}
                  <RadioGroup
                    onValueChange={() => handleRadioChange(skillBoost.skill)}
                    defaultValue={findDefaultValue(skillBoost.LevelsBoosted)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Untrained" id="Untrained" />
                      <Label htmlFor="option-one">Untrained</Label>
                      <RadioGroupItem value="Trained" id="Trained" />
                      <Label htmlFor="option-two">Trained</Label>
                      <RadioGroupItem
                        value="Expert"
                        id="Expert"
                        disabled={currentLevel < 3}
                      />
                      <Label htmlFor="option-two">Expert</Label>
                      <RadioGroupItem
                        value="Master"
                        id="Master"
                        disabled={currentLevel < 7}
                      />
                      <Label htmlFor="option-two">Master</Label>
                      <RadioGroupItem
                        value="Legendary"
                        id="Legendary"
                        disabled={currentLevel < 15}
                      />
                      <Label htmlFor="option-two">Legendary</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {skillIncreaseLevels.includes(currentLevel) && <div>Skill Increase</div>}
    </>
  );
};

export default SkillIncreases;
