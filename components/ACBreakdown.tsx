import { selectACBreakdownData } from "@/app/selectors";
import { RootState } from "@/app/store";
import { armourData, Classes, shieldData } from "@/data";
import calculateCurrentArmourProficiencyBonus from "@/lib/calculateCurrentArmourProficiencyBonus";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";
import { AttributeBoostsType } from "@/types";
import React from "react";
import { useSelector } from "react-redux";

interface ACBreakdownProps {
  shieldRaised: boolean;
}

const ACBreakdown = ({ shieldRaised }: ACBreakdownProps) => {
  const {
    currentLevel,
    selectedArmour,
    selectedPotency,
    selectedShield,
    selectedClass,
    attributeBoosts,
  } = useSelector(selectACBreakdownData);

  const selectedShieldData = shieldData.find(
    (shieldItem) => shieldItem.name === selectedShield
  );
  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );
  const selectedArmourData = armourData.find(
    (armourItem) => armourItem.name === selectedArmour
  );

  //------------------------------------------------------------------------------//

  if (!selectedArmourData) {
    return <p>No armour selected</p>;
  }

  return (
    <p>
      Base: 10 <br />
      Proficiency:{" "}
      {calculateCurrentArmourProficiencyBonus(
        selectedArmourData.category,
        currentLevel,
        selectedClassData
      ) > 0
        ? calculateCurrentArmourProficiencyBonus(
            selectedArmourData.category,
            currentLevel,
            selectedClassData
          ) + currentLevel
        : 0}
      <br />
      Item: {selectedArmourData.ACBonus} <br />
      Potency: {selectedPotency} <br />
      Dexterity:{" "}
      {Math.min(
        calculateCurrentAttributeBoost(
          "Dexterity",
          currentLevel,
          attributeBoosts
        ),
        selectedArmourData.dexCap
      )}
      <br />
      Shield: {shieldRaised ? selectedShieldData?.ACBonus : 0} <br />
    </p>
  );
};

export default ACBreakdown;
