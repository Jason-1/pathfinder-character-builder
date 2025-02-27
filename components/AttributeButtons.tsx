import { Attributes } from "@/data";
import React from "react";
import { Button } from "./ui/button";
import { AttributeBoost, AttributesType, Category } from "@/types";

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

interface LevelSelectorProps {
  attributeBoosts: AttributeBoost[];
  setAttributeBoosts: React.Dispatch<React.SetStateAction<AttributeBoost[]>>;
}

const AttributeButtons: React.FC<LevelSelectorProps> = ({
  attributeBoosts,
  setAttributeBoosts,
}) => {
  function handleClick(attribute: AttributesType, boostsType: Category): void {
    const currentBoost = attributeBoosts.find(
      ({ name }) => name === boostsType
    );
    if (
      currentBoost &&
      !currentBoost.boosts.includes(attribute) &&
      currentBoost.boosts.length < BoostLimits[boostsType]
    ) {
      setAttributeBoosts((prev) =>
        prev.map((boost) =>
          boost.name === boostsType
            ? { ...boost, boosts: [...boost.boosts, attribute] }
            : boost
        )
      );
    } else if (currentBoost && currentBoost.boosts.includes(attribute)) {
      setAttributeBoosts((prev) =>
        prev.map((boost) =>
          boost.name === boostsType
            ? { ...boost, boosts: boost.boosts.filter((b) => b !== attribute) }
            : boost
        )
      );
    }
  }

  return (
    <>
      {attributeBoosts.map((currentAttributeBoost) => (
        <React.Fragment key={currentAttributeBoost.name}>
          <p className="mt-6" key={currentAttributeBoost.name + "title"}>
            {currentAttributeBoost.name}
          </p>
          <div
            className="grid grid-cols-6 gap-1"
            key={currentAttributeBoost.name}
          >
            {Attributes.map((attribute) => (
              <Button
                variant="default"
                key={attribute.name}
                className={`col-span-1 ${
                  attributeBoosts.find(
                    ({ name, boosts }) =>
                      name === currentAttributeBoost.name &&
                      boosts.includes(attribute.name)
                  )
                    ? "opacity-100"
                    : "opacity-70"
                }`}
                onClick={() =>
                  handleClick(
                    attribute.name,
                    currentAttributeBoost.name as Category
                  )
                }
              >
                {attribute.name}
              </Button>
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default AttributeButtons;
