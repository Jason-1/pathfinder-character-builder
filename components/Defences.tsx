import React from "react";
import { Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { AttributeBoostsType } from "@/types";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";

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
    </div>
  );
};

export default Defences;
