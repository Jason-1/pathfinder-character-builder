import { Attributes } from "@/data";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { AttributeBoost, AttributesType, Category } from "@/types";

interface LevelSelectorProps {
  boostsType: Category;
  attributeBoosts: AttributeBoost[];
  setAttributeBoosts: React.Dispatch<React.SetStateAction<AttributeBoost[]>>;
}

const BoostLimits = {
  Ancestry: 2,
  Background: 2,
  Class: 1,
  Initial: 4,
  Level5: 4,
  Level10: 4,
  Level15: 4,
  Level20: 4,
};

const AttributeButtons: React.FC<LevelSelectorProps> = ({
  boostsType,
  attributeBoosts,
  setAttributeBoosts,
}) => {
  function handleClick(attribute: AttributesType): void {
    if (
      attributeBoosts.find(
        ({ name, boosts }) =>
          name === boostsType &&
          !boosts.includes(attribute) &&
          boosts.length < BoostLimits[boostsType]
      )
    ) {
      setAttributeBoosts((prev) => {
        const updatedBoosts = prev.map((boost) =>
          boost.name === boostsType
            ? { ...boost, boosts: [...boost.boosts, attribute] }
            : boost
        );

        return updatedBoosts;
      });
    } else if (
      attributeBoosts.find(
        ({ name, boosts }) => name === boostsType && boosts.includes(attribute)
      )
    ) {
      console.log("Removing attribute:", attribute, "from", boostsType);
      setAttributeBoosts((prev) => {
        const updatedBoosts = prev.map((boost) =>
          boost.name === boostsType
            ? { ...boost, boosts: boost.boosts.filter((b) => b !== attribute) }
            : boost
        );

        return updatedBoosts;
      });
    }
  }

  return (
    <>
      <p className="mt-6">{boostsType}</p>
      <div className="grid grid-cols-6 gap-1">
        {Attributes.map((attribute) => (
          <Button
            variant="default"
            key={attribute.name}
            className={`col-span-1 ${
              attributeBoosts.find(
                ({ name, boosts }) =>
                  name === boostsType && boosts.includes(attribute.name)
              )
                ? "opacity-10"
                : "opacity-100"
            }`}
            onClick={() => handleClick(attribute.name)}
          >
            {attribute.name}
          </Button>
        ))}
      </div>
    </>
  );
};

export default AttributeButtons;
