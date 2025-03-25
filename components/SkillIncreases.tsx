import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Backgrounds, Classes } from "@/data";
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

  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  const selectedBackgroundData = Backgrounds.find(
    (backgroundItem) => backgroundItem.name === selectedBackground
  );

  // Check the IntBoost state for the current level as well
  function findDefaultValue(skillBoost: skillProficienciesType) {
    var totalBoosts: number = 0;

    if (skillBoost.IntBoost === currentLevel) {
      totalBoosts += 1;
    }

    const boostsAtCurrentLevel = skillBoost.LevelsBoosted.filter(
      (level) => level <= currentLevel
    );
    totalBoosts += boostsAtCurrentLevel.length;

    switch (totalBoosts) {
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

  // X Remove intelligenceBoosted state
  // X Write function to check if IntBoost has been set to the current level for any state
  // If an int boost is applied, set that to the current level
  // If an int boost is removed, set the one that was set to the current level back to null
  // Update currentBoostsUsed and handleDisabled to check the new function instead of intelligenceBoosted

  //Add 0 for Background and class boosts
  const handleRadioChange = (
    skill: skillTypes | "",
    levelsBoosted: number[]
  ) => {
    if (boostType === "Intelligence") {
      setSelectedSkills((prevSkills) =>
        prevSkills.map((skillBoost) =>
          skillBoost.skill === skill
            ? {
                ...skillBoost,
                IntBoost:
                  skillBoost.IntBoost === currentLevel ? null : currentLevel,
              }
            : skillBoost
        )
      );
    } else {
      setSelectedSkills((prevSkills) =>
        prevSkills.map((skillBoost) =>
          skillBoost.skill === skill
            ? {
                ...skillBoost,
                LevelsBoosted: skillBoost.LevelsBoosted.includes(currentLevel)
                  ? skillBoost.LevelsBoosted.filter(
                      (level) => level < currentLevel
                    )
                  : [
                      ...skillBoost.LevelsBoosted.filter(
                        (level) => level <= currentLevel
                      ),
                      currentLevel,
                    ].sort((a, b) => a - b),
              }
            : skillBoost
        )
      );
    }

    console.log(selectedSkills);
  };

  //Allow 1 extra boost for intelligence
  //Reduce instances by 1 only if an int boost has been applied
  function currentBoostsUsed() {
    var instances = selectedSkills.filter((skillBoost) =>
      skillBoost.LevelsBoosted.includes(currentLevel)
    ).length;
    if (checkIntelligenceBoosted() || boostType === "Intelligence") {
      instances -= 1;
    }
    return instances;
  }

  function checkIntelligenceBoosted() {
    selectedSkills.forEach((skillBoost) => {
      if (skillBoost.IntBoost === currentLevel) {
        return true;
      }
    });
    return false;
  }

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
        currentBoostsUsed() < availableBoosts
      ) {
        if (checkIntelligenceBoosted() && boostType === "Intelligence") {
          return true;
        }
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
        currentBoostsUsed() < availableBoosts
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
        currentBoostsUsed() < availableBoosts
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
        currentBoostsUsed() < availableBoosts
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
                    defaultValue={findDefaultValue(skillBoost)}
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
