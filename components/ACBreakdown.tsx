import { armourData, shieldData } from "@/data";
import calculateCurrentArmourProficiencyBonus from "@/lib/calculateCurrentArmourProficiencyBonus";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";
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
  const selectedArmourData = armourData.find(
    (armourItem) => armourItem.name === selectedArmour
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

  //------------------------------------------------------------------------------//

  if (!selectedArmourData) {
    return <p>No armour selected</p>;
  }

  return (
    <p>
      Base: 10 <br />
      Proficiency:{" "}
      {calculateCurrentArmourProficiencyBonus(selectedArmourData.type) > 0
        ? calculateCurrentArmourProficiencyBonus(selectedArmourData.type) +
          currentLevel
        : 0}
      <br />
      Item: {selectedArmourData.ACBonus} <br />
      Potency: {selectedPotency} <br />
      Dexterity:{" "}
      {Math.min(
        calculateCurrentAttributeBoost("Dexterity"),
        selectedArmourData.dexCap
      )}
      <br />
      Shield: {shieldRaised ? selectedShieldData?.ACBonus : 0} <br />
    </p>
  );
};

export default ACBreakdown;
