import React from "react";
import { Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { AttributeBoostsType } from "@/types";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";
import { FaDiceD20 } from "react-icons/fa";
import { motion } from "motion/react";
import DiceRoller from "./DiceRoller";

const Defences = () => {
  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );

  const attributeBoosts = useSelector(
    (state: { attributeBoostCategories: AttributeBoostsType[] }) =>
      state.attributeBoostCategories
  );

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

  function calculateFortitude() {
    var Fortitude = 0;
    const proficiency = 2; // TODO: Add proficiency bonus
    const item = 0; // TODO: Add item bonus
    const rune = 0; // TODO: Add rune bonus
    const constitution = calculateCurrentAttributeBoost(
      attributeBoosts,
      currentLevel,
      "Constitution"
    );

    Fortitude += proficiency;
    Fortitude += currentLevel;
    Fortitude += item;
    Fortitude += rune;
    Fortitude += constitution;

    return Fortitude;
  }

  function calculateReflex() {
    var Fortitude = 0;
    const proficiency = 2; // TODO: Add proficiency bonus
    const item = 0; // TODO: Add item bonus
    const rune = 0; // TODO: Add rune bonus
    const dexterity = calculateCurrentAttributeBoost(
      attributeBoosts,
      currentLevel,
      "Dexterity"
    );

    Fortitude += proficiency;
    Fortitude += currentLevel;
    Fortitude += item;
    Fortitude += rune;
    Fortitude += dexterity;

    return Fortitude;
  }

  function calculateWill() {
    var Fortitude = 0;
    const proficiency = 2; // TODO: Add proficiency bonus
    const item = 0; // TODO: Add item bonus
    const rune = 0; // TODO: Add rune bonus
    const wisdom = calculateCurrentAttributeBoost(
      attributeBoosts,
      currentLevel,
      "Wisdom"
    );

    Fortitude += proficiency;
    Fortitude += currentLevel;
    Fortitude += item;
    Fortitude += rune;
    Fortitude += wisdom;

    return Fortitude;
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

      <div className="w-48 h-8 bg-red-500 flex items-center px-4">
        <span className="text-white text-md font-bold">
          {"HP"} {calculateHP()}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className=" flex flex-row items-center gap-2">
          <span className="border px-2 rounded-full border-red-500 bg-red-600">
            T {/* Get training levels from class */}
          </span>
          <DiceRoller diceType="d20" modifier={calculateFortitude()} />
          <span>Fortitude: +{calculateFortitude()}</span>
        </div>
        <div className=" flex flex-row items-center gap-2">
          <span className="border px-2 rounded-full border-red-500 bg-red-600">
            T
          </span>
          <DiceRoller diceType="d20" modifier={calculateReflex()} />
          <span>Reflex: +{calculateReflex()}</span>
        </div>
        <div className=" flex flex-row items-center gap-2">
          <span className="border px-2 rounded-full border-red-500 bg-red-600">
            T
          </span>
          <DiceRoller diceType="d20" modifier={calculateWill()} />
          <span>Will: +{calculateWill()}</span>
        </div>
      </div>
    </div>
  );
};

export default Defences;
