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
import { skillProficienciesType, skillTypes, TrainingType } from "@/types";

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
  function findTrainingLevel(numericalTraining: number) {
    switch (numericalTraining) {
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

  function findDefaultValue(LevelsBoosted: number[]) {
    const boostsAtCurrentLevel = LevelsBoosted.filter(
      (level) => level <= currentLevel
    );

    //TODO - Disable reducing the skills proficiency level unless the boost was applied to the applicable skill
    //TODO - Add the ability to remove a skill proficiency level
    //TODO - Only allow increasing or reducing 1 step

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

  // Adds the levels the skill was boosted at in order to the array. If the level is already in the array, it is removed.
  const handleRadioChange = (skill: skillTypes | "") => {
    setSelectedSkills((prevSkills) =>
      prevSkills.map((skillBoost) =>
        skillBoost.skill === skill
          ? {
              ...skillBoost,
              LevelsBoosted: skillBoost.LevelsBoosted.includes(currentLevel)
                ? skillBoost.LevelsBoosted.filter(
                    (level) => level !== currentLevel
                  )
                : [...skillBoost.LevelsBoosted, currentLevel].sort(
                    (a, b) => a - b
                  ),
            }
          : skillBoost
      )
    );
  };

  const handleDisabled = (
    currentButtonProficiency: TrainingType,
    skillBoosts: skillProficienciesType
  ) => {
    if (currentButtonProficiency === "Expert" && currentLevel < 3) {
      return true;
    }
    if (currentButtonProficiency === "Master" && currentLevel < 7) {
      return true;
    }
    if (currentButtonProficiency === "Legendary" && currentLevel < 15) {
      return true;
    }

    const numericalTrainingLevel = skillBoosts.LevelsBoosted.filter(
      (level) => level <= currentLevel
    ).length;
    const currentTrainingLevel = findTrainingLevel(numericalTrainingLevel);

    //disable if training is trained or higher and the skill has not been allocated this level
    if (currentButtonProficiency === "Untrained") {
      if (
        currentTrainingLevel === "Trained" &&
        skillBoosts.LevelsBoosted.includes(currentLevel)
      ) {
        return false;
      }
    }
    if (currentButtonProficiency === "Trained") {
      if (currentTrainingLevel === "Untrained") {
        return false;
      }
    }
    if (currentButtonProficiency === "Expert") {
    }
    if (currentButtonProficiency === "Master") {
    }
    if (currentButtonProficiency === "Legendary") {
    }

    return true;
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
                      <RadioGroupItem
                        value="Untrained"
                        id="Untrained"
                        disabled={handleDisabled("Untrained", skillBoost)}
                      />
                      <Label htmlFor="option-one">Untrained</Label>
                      <RadioGroupItem
                        value="Trained"
                        id="Trained"
                        disabled={handleDisabled("Trained", skillBoost)}
                      />
                      <Label htmlFor="option-two">Trained</Label>
                      <RadioGroupItem
                        value="Expert"
                        id="Expert"
                        disabled={handleDisabled("Expert", skillBoost)}
                      />
                      <Label htmlFor="option-two">Expert</Label>
                      <RadioGroupItem
                        value="Master"
                        id="Master"
                        disabled={handleDisabled("Master", skillBoost)}
                      />
                      <Label htmlFor="option-two">Master</Label>
                      <RadioGroupItem
                        value="Legendary"
                        id="Legendary"
                        disabled={handleDisabled("Legendary", skillBoost)}
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
