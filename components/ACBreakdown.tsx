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
  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );
  const selectedArmour = useSelector(
    (state: { armour: { armour: string } }) => state.armour.armour
  );
  const selectedPotency = useSelector(
    (state: { potency: { potency: number } }) => state.potency.potency
  );
  const selectedShield = useSelector(
    (state: { shield: { shield: string } }) => state.shield.shield
  );
  const selectedShieldData = shieldData.find(
    (shieldItem) => shieldItem.name === selectedShield
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
