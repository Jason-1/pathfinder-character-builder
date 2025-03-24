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
import {
  AttributeBoostsType,
  skillProficienciesType,
  skillTypes,
  TrainingType,
} from "@/types";

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
  attributeBoostCategories: AttributeBoostsType[];
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
  attributeBoostCategories,
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
    if (
      currentButtonProficiency === "Expert" &&
      (currentLevel < 3 || boostType === "Intelligence")
    ) {
      return true;
    }
    if (
      currentButtonProficiency === "Master" &&
      (currentLevel < 7 || boostType === "Intelligence")
    ) {
      return true;
    }
    if (
      currentButtonProficiency === "Legendary" &&
      (currentLevel < 15 || boostType === "Intelligence")
    ) {
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

  // Add background skill in background then remove it in initial proficiencies, it cant be re-added in background
  // Maybe set Background and class to level 0 boosts?

  return (
    <>
      <Dialog>
        <DialogTrigger className="mt-4">{increaseHeaderText}</DialogTrigger>
        <DialogContent className="w-full max-w-xl ">
          <DialogHeader>
            <DialogTitle>Allocate Skill Proficiencies</DialogTitle>
            <div className="grid grid-cols-8 items-center gap-x-4">
              <p className="col-span-2"></p>
              <div className="flex items-center justify-between col-span-6">
                <p className="w-[24px] text-center">U</p>
                <p className="w-[24px] text-center">T</p>
                <p className="w-[24px] text-center">E</p>
                <p className="w-[24px] text-center">M</p>
                <p className="w-[24px] text-center">L</p>
              </div>
            </div>

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
                <div
                  key={skillBoost.skill}
                  className="grid grid-cols-8 items-center gap-x-4 mt-2"
                >
                  <span className="col-span-2 ">{skillBoost.skill}</span>
                  <RadioGroup
                    onValueChange={() =>
                      handleRadioChange(
                        skillBoost.skill,
                        skillBoost.LevelsBoosted
                      )
                    }
                    defaultValue={findDefaultValue(skillBoost.LevelsBoosted)}
                    className="col-span-6 flex items-center justify-between"
                  >
                    <RadioGroupItem
                      value="Untrained"
                      id="Untrained"
                      disabled={handleDisabled("Untrained", skillBoost)}
                    />
                    <RadioGroupItem
                      value="Trained"
                      id="Trained"
                      disabled={handleDisabled("Trained", skillBoost)}
                    />
                    <RadioGroupItem
                      value="Expert"
                      id="Expert"
                      disabled={handleDisabled("Expert", skillBoost)}
                    />
                    <RadioGroupItem
                      value="Master"
                      id="Master"
                      disabled={handleDisabled("Master", skillBoost)}
                    />
                    <RadioGroupItem
                      value="Legendary"
                      id="Legendary"
                      disabled={handleDisabled("Legendary", skillBoost)}
                    />
                  </RadioGroup>
                </div>
              ))}
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkillIncreases;
