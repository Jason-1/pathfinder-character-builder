import {
  selectArmour,
  selectAttributeBoostCategories,
  selectClass,
  selectLevel,
  selectPotency,
  selectShield,
} from "@/app/redux/reducers";
import { armourData, Classes, shieldData } from "@/data";
import calculateCurrentArmourProficiencyBonus from "@/lib/calculateCurrentArmourProficiencyBonus";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";
import React from "react";
import { useSelector } from "react-redux";

interface ACBreakdownProps {
  shieldRaised: boolean;
}

const ACBreakdown = ({ shieldRaised }: ACBreakdownProps) => {
  const selectedLevel = useSelector(selectLevel);
  const selectedArmour = useSelector(selectArmour);
  const selectedPotency = useSelector(selectPotency);
  const selectedShield = useSelector(selectShield);
  const selectedClass = useSelector(selectClass);
  const attributeBoosts = useSelector(selectAttributeBoostCategories);

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
        selectedLevel,
        selectedClassData
      ) > 0
        ? calculateCurrentArmourProficiencyBonus(
            selectedArmourData.category,
            selectedLevel,
            selectedClassData
          ) + selectedLevel
        : 0}
      <br />
      Item: {selectedArmourData.ACBonus} <br />
      Potency: {selectedPotency} <br />
      Dexterity:{" "}
      {Math.min(
        calculateCurrentAttributeBoost(
          "Dexterity",
          selectedLevel,
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
