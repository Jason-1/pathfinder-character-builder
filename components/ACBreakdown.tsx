import {
  selectArmour,
  selectAttributeBoostCategories,
  selectClass,
  selectLevel,
  selectPotency,
  selectShield,
} from "@/app/redux/selectors";
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

  //------------------------------------------------------------------------------//

  if (!selectedArmour) {
    return <p>No armour selected</p>;
  }

  return (
    <p>
      Base: 10 <br />
      Proficiency:{" "}
      {calculateCurrentArmourProficiencyBonus(
        selectedArmour.category,
        selectedLevel,
        selectedClass
      ) > 0
        ? calculateCurrentArmourProficiencyBonus(
            selectedArmour.category,
            selectedLevel,
            selectedClass
          ) + selectedLevel
        : 0}
      <br />
      Item: {selectedArmour.ACBonus} <br />
      Potency: {selectedPotency} <br />
      Dexterity:{" "}
      {Math.min(
        calculateCurrentAttributeBoost(
          "Dexterity",
          selectedLevel,
          attributeBoosts
        ),
        selectedArmour.dexCap
      )}
      <br />
      Shield: {shieldRaised ? selectedShieldData?.ACBonus : 0} <br />
    </p>
  );
};

export default ACBreakdown;
