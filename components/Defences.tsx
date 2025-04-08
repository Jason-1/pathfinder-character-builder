import React from "react";
import { Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { AttributeBoostsType, saveTypes } from "@/types";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";
import DiceRoller from "./DiceRoller";
import { Classes } from "@/data";
import TrainingIcon from "./Icons/TrainingIcon";

const Defences = () => {
  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );

  const selectedClass = useSelector(
    (state: { class: { class: string } }) => state.class.class
  );

  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  const attributeBoosts = useSelector(
    (state: { attributeBoostCategories: AttributeBoostsType[] }) =>
      state.attributeBoostCategories
  );

  const calculateSaveProficiencyBonus = (saveType: saveTypes) => {
    if (!selectedClassData) {
      return 0;
    }

    var proficiency = 0;

    selectedClassData.saves[saveType].forEach((level) => {
      if (level <= currentLevel) {
        proficiency += 2;
      }
    });

    return proficiency;
  };

  const calculateSaveProficiencyLevel = (saveType: saveTypes) => {
    const proficiency = calculateSaveProficiencyBonus(saveType);
    switch (proficiency) {
      case 0:
        return "U";
      case 2:
        return "T";
      case 4:
        return "E";
      case 6:
        return "M";
      case 8:
        return "L";
      default:
        return "U";
    }
  };
  function calculateAC() {
    var AC = 0;
    const dexCap = 5; // TODO: Add dex cap bonus

    const Base = 10;
    const proficiency = 2; // TODO: Add proficiency bonus
    const item = 0; // TODO: Add item bonus
    const rune = 0; // TODO: Add rune bonus
    const dexterity = Math.min(
      calculateCurrentAttributeBoost(
        attributeBoosts,
        currentLevel,
        "Dexterity"
      ),
      dexCap
    );
    const shield = 0; // TODO: Add shield bonus

    AC += Base;
    AC += proficiency;
    AC += currentLevel;
    AC += item;
    AC += shield;
    AC += rune;
    AC += dexterity;

    return AC;
  }

  function calculateHP() {
    var HP = 0;
    const base = 10; // TODO: Add base HP bonus
    const ancestry = 8; // TODO: Add ancestry HP bonus
    const constitution = calculateCurrentAttributeBoost(
      attributeBoosts,
      currentLevel,
      "Constitution"
    );
    const bonus = 0; // TODO: Add bonus HP from items or feats

    HP += ancestry;
    HP += base * currentLevel;
    HP += constitution * currentLevel;

    return HP;
  }

  function calculateSaveBonus(saveType: saveTypes) {
    let saveBonus = 0;
    const proficiency = calculateSaveProficiencyBonus(saveType);
    const item = 0; // TODO: Add item bonus
    const rune = 0; // TODO: Add rune bonus
    let attribute = 0; // TODO: Add attribute bonus
    if (saveType === "fortitude") {
      attribute = calculateCurrentAttributeBoost(
        attributeBoosts,
        currentLevel,
        "Constitution"
      );
    }
    if (saveType === "reflex") {
      attribute = calculateCurrentAttributeBoost(
        attributeBoosts,
        currentLevel,
        "Dexterity"
      );
    }
    if (saveType === "will") {
      attribute = calculateCurrentAttributeBoost(
        attributeBoosts,
        currentLevel,
        "Wisdom"
      );
    }

    saveBonus += proficiency;
    saveBonus += currentLevel;
    saveBonus += item;
    saveBonus += rune;
    saveBonus += attribute;

    return saveBonus;
  }

  return (
    <div className="flex flex-row items-center gap-4">
      <div className="relative inline-block w-24 h-24">
        <Shield className="w-full h-full text-gray-500" />
        <span className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl font-bold">
          <span className="text-xs">AC</span>
          {calculateAC()}
        </span>
      </div>

      <div className="w-32 h-8 bg-red-500 flex items-center px-4">
        <span className="text-white text-md font-bold">
          {"HP"} {calculateHP()}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className=" flex flex-row gap-2 items-center align-middle">
          <TrainingIcon>
            {calculateSaveProficiencyLevel("fortitude")}
          </TrainingIcon>
          <DiceRoller
            diceType="d20"
            modifier={calculateSaveBonus("fortitude")}
          />
          <span>Fortitude: +{calculateSaveBonus("fortitude")}</span>
        </div>
        <div className=" flex flex-row gap-2 items-center">
          <TrainingIcon>{calculateSaveProficiencyLevel("reflex")}</TrainingIcon>
          <DiceRoller diceType="d20" modifier={calculateSaveBonus("reflex")} />
          <span>Reflex: +{calculateSaveBonus("reflex")}</span>
        </div>
        <div className=" flex flex-row gap-2 items-center">
          <TrainingIcon>{calculateSaveProficiencyLevel("will")}</TrainingIcon>
          <DiceRoller diceType="d20" modifier={calculateSaveBonus("will")} />
          <span>Will: +{calculateSaveBonus("will")}</span>
        </div>
      </div>
    </div>
  );
};

export default Defences;
