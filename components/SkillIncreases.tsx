import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Backgrounds, Classes, skillIncreaseLevels } from "@/data";
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
  increaseHeaderText: string;
  boostType: string;
}

const SkillIncreases: React.FC<SkillIncreaseProps> = ({
  currentLevel,
  selectedBackground,
  selectedClass,
  availableBoosts,
  selectedSkills,
  setSelectedSkills,
  increaseHeaderText,
  boostType,
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

  const [boostCounter, setBoostCounter] = React.useState(0);

  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  const selectedBackgroundData = Backgrounds.find(
    (backgroundItem) => backgroundItem.name === selectedBackground
  );

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
  // Increment boostCounter if the skill is being boosted, decrement if it is being unboosted
  // Currently it is able to exceed 4 boosts if earlier boosts are removed
  const handleRadioChange = (
    skill: skillTypes | "",
    levelsBoosted: number[]
  ) => {
    if (levelsBoosted.includes(currentLevel)) {
      setBoostCounter(boostCounter - 1);
    } else {
      setBoostCounter(boostCounter + 1);
    }

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

  // Potentilly disallow removing a boost if one has been applied at a higher level

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
      if (
        currentTrainingLevel === "Untrained" &&
        boostCounter < availableBoosts
      ) {
        return false;
      }
      if (
        currentTrainingLevel === "Expert" &&
        skillBoosts.LevelsBoosted.includes(currentLevel)
      ) {
        return false;
      }
    }
    if (currentButtonProficiency === "Expert") {
      if (
        currentTrainingLevel === "Trained" &&
        !skillBoosts.LevelsBoosted.includes(currentLevel) &&
        boostCounter < availableBoosts
      ) {
        return false;
      }
      if (
        currentTrainingLevel === "Master" &&
        skillBoosts.LevelsBoosted.includes(currentLevel)
      ) {
        return false;
      }
    }
    if (currentButtonProficiency === "Master") {
      if (
        currentTrainingLevel === "Expert" &&
        !skillBoosts.LevelsBoosted.includes(currentLevel) &&
        boostCounter < availableBoosts
      ) {
        return false;
      }
      if (
        currentTrainingLevel === "Legendary" &&
        skillBoosts.LevelsBoosted.includes(currentLevel)
      ) {
        return false;
      }
    }
    if (currentButtonProficiency === "Legendary") {
      if (
        currentTrainingLevel === "Master" &&
        !skillBoosts.LevelsBoosted.includes(currentLevel) &&
        boostCounter < availableBoosts
      ) {
        return false;
      }
    }

    return true;
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="mt-4">{increaseHeaderText}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Allocate Skill Proficiencies</DialogTitle>
            <DialogDescription>
              {selectedSkills
                .filter(
                  (skill) =>
                    (boostType !== "Class" && boostType !== "Background") ||
                    ((boostType !== "Class" ||
                      (selectedClassData?.skills &&
                        skill.skill in selectedClassData.skills)) &&
                      (boostType !== "Background" ||
                        (selectedBackgroundData?.skills &&
                          skill.skill !== "" &&
                          selectedBackgroundData.skills.includes(skill.skill))))
                )
                .map((skillBoost) => (
                  <div key={skillBoost.skill} className="mt-4">
                    {skillBoost.skill}{" "}
                    <RadioGroup
                      onValueChange={() =>
                        handleRadioChange(
                          skillBoost.skill,
                          skillBoost.LevelsBoosted
                        )
                      }
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
    </>
  );
};

export default SkillIncreases;
