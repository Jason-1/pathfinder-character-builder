import { Attributes } from "@/data";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { AttributeBoost, AttributesType, Category } from "@/types";
import { InitialAttributeBoosts } from "@/data";
import { init } from "next/dist/compiled/webpack/webpack";

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
  selectedLevel: number;
  attributeBoosts: AttributeBoost[];
  setAttributeBoosts: React.Dispatch<React.SetStateAction<AttributeBoost[]>>;
}

const AttributeButtons: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  attributeBoosts,
  setAttributeBoosts,
}) => {
  function handleClick(attribute: AttributesType, boostsType: Category): void {
    if (
      (boostsType === "Level5" && selectedLevel < 5) ||
      (boostsType === "Level10" && selectedLevel < 10) ||
      (boostsType === "Level15" && selectedLevel < 15) ||
      (boostsType === "Level20" && selectedLevel < 20)
    ) {
      return;
    }
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
      {InitialAttributeBoosts.map((boost) => (
        <>
          <p className="mt-6" key={boost.name + "title"}>
            {boost.name}
          </p>
          <div className="grid grid-cols-6 gap-1" key={boost.name}>
            {Attributes.map((attribute) => (
              <Button
                variant="default"
                key={attribute.name}
                className={`col-span-1 ${
                  attributeBoosts.find(
                    ({ name, boosts }) =>
                      name === boost.name && boosts.includes(attribute.name)
                  )
                    ? "opacity-100"
                    : "opacity-70"
                }`}
                onClick={() =>
                  handleClick(attribute.name, boost.name as Category)
                }
              >
                {attribute.name}
              </Button>
            ))}
          </div>
        </>
      ))}
    </>
  );
};

export default AttributeButtons;
