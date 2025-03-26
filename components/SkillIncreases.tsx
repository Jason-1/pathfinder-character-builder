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

  function findDefaultValue(skillBoost: skillProficienciesType) {
    var totalBoosts: number = 0;

    if (skillBoost.IntBoost) {
      if (skillBoost.IntBoost <= currentLevel) {
        totalBoosts += 1;
      }
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
  };

  function currentBoostsUsed() {
    var instances = selectedSkills.filter((skillBoost) =>
      skillBoost.LevelsBoosted.includes(currentLevel)
    ).length;

    return instances;
  }

  const handleDisabled = (
    currentButtonProficiency: TrainingType,
    skillBoosts: skillProficienciesType
  ) => {
    //If this is an int boost or we arent at the minimum level for the proficiency dont allow higher levels than trained
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

    //Calculate the current training level, factoring in intelligence boosts
    const intTraining = skillBoosts.IntBoost ? 1 : 0;
    const numericalTrainingLevel = skillBoosts.LevelsBoosted.filter(
      (level) => level <= currentLevel
    ).length;
    const currentTrainingLevel = findTrainingLevel(
      numericalTrainingLevel + intTraining
    );

    //If this is an intelligence boost, it doesn't add to the boost limit, and can only be trained or untrained
    if (boostType === "Intelligence") {
      //Are there are intelligence boosts at this level?
      const hasIntBoostAtCurrentLevel = selectedSkills.some(
        (skillBoost) => skillBoost.IntBoost === currentLevel
      );

      if (currentButtonProficiency === "Untrained" && !skillBoosts.IntBoost) {
        return true;
      }

      //if there are intelligence boosts at this level, disallow trained on all skills and only allow untrained on the boosted skill
      if (hasIntBoostAtCurrentLevel) {
        if (currentButtonProficiency === "Trained") {
          return true;
        }
        if (
          currentButtonProficiency === "Untrained" &&
          skillBoosts.IntBoost === currentLevel
        ) {
          return false;
        }
      }
      //There are no intelligence boosts at this level, allow trained on all skills that are currently untrained
      else {
        //Need to check if the skill is higher than untrained, if so disallow the boost
        if (currentTrainingLevel !== "Untrained") {
          return true;
        } else {
          return false;
        }
      }
    }

    //Now we know we're not in an int boost, we can check the other boosts and need to abide by the boost limit
    if (currentButtonProficiency === "Untrained") {
      //Can only select Untrained if the skill is currently trained and has been boosted this level
      if (currentTrainingLevel === "Trained") {
        if (skillBoosts.LevelsBoosted.includes(currentLevel)) {
          return false;
        }
      }
    }
    if (currentButtonProficiency === "Trained") {
      //If training level is one lower and we have a boost to spend, allow an increase
      if (currentTrainingLevel === "Untrained") {
        if (currentBoostsUsed() < availableBoosts) {
          return false;
        }
      }
      ///If training level is one higher and we have boosted this level, allow decrease
      if (currentTrainingLevel === "Expert") {
        if (skillBoosts.LevelsBoosted.includes(currentLevel)) {
          return false;
        }
      }
    }
    if (currentButtonProficiency === "Expert") {
      //If training level is one lower and we have a boost to spend, allow an increase
      if (currentTrainingLevel === "Trained") {
        if (currentBoostsUsed() < availableBoosts) {
          if (skillBoosts.IntBoost !== currentLevel) {
            return false;
          }
        }
      }
      ///If training level is one higher and we have boosted this level, allow decrease
      if (currentTrainingLevel === "Master") {
        if (skillBoosts.LevelsBoosted.includes(currentLevel)) {
          return false;
        }
      }
    }
    if (currentButtonProficiency === "Master") {
      //If training level is one lower and we have a boost to spend, allow an increase
      if (currentTrainingLevel === "Expert") {
        if (currentBoostsUsed() < availableBoosts) {
          if (skillBoosts.IntBoost !== currentLevel) {
            return false;
          }
        }
      }
      ///If training level is one higher and we have boosted this level, allow decrease
      if (currentTrainingLevel === "Legendary") {
        if (skillBoosts.LevelsBoosted.includes(currentLevel)) {
          return false;
        }
      }
    }
    if (currentButtonProficiency === "Legendary") {
      //If training level is one lower and we have a boost to spend, allow an increase
      if (currentTrainingLevel === "Master") {
        if (currentBoostsUsed() < availableBoosts) {
          if (skillBoosts.IntBoost !== currentLevel) {
            return false;
          }
        }
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
            <DialogTitle>{increaseHeaderText}</DialogTitle>
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
