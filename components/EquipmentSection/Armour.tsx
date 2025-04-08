import { Classes } from "@/data";
import { armourTypes } from "@/types";
import React from "react";
import { useSelector } from "react-redux";

const Armour = () => {
  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );

  const selectedClass = useSelector(
    (state: { class: { class: string } }) => state.class.class
  );

  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  const calculateArmourProficiencyBonus = (armourType: armourTypes) => {
    if (!selectedClassData) {
      return 0;
    }

    var proficiency = 0;

    selectedClassData.defences[armourType].forEach((level) => {
      if (level <= currentLevel) {
        proficiency += 2;
      }
    });

    return proficiency;
  };

  const calculateArmourProficiencyLevel = (armourType: armourTypes) => {
    const proficiency = calculateArmourProficiencyBonus(armourType);
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

  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="flex flex-row gap-2">
        <p>Unarmoured</p>
        <span className="border px-2 rounded-full border-red-500 bg-red-600 h-6 w-6 flex items-center justify-center">
          {calculateArmourProficiencyLevel("unarmoured")}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <p>Light</p>
        <span className="border px-2 rounded-full border-red-500 bg-red-600 h-6 w-6 flex items-center justify-center">
          {calculateArmourProficiencyLevel("light")}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <p>Medium</p>
        <span className="border px-2 rounded-full border-red-500 bg-red-600 h-6 w-6 flex items-center justify-center">
          {calculateArmourProficiencyLevel("medium")}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <p>Heavy</p>
        <span className="border px-2 rounded-full border-red-500 bg-red-600 h-6 w-6 flex items-center justify-center">
          {calculateArmourProficiencyLevel("heavy")}
        </span>
      </div>
    </div>
  );
};

export default Armour;
