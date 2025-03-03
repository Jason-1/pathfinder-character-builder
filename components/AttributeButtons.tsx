import { Attributes, Classes } from "@/data";
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
  attributeBoostCategories: AttributeBoost[];
  setAttributeBoostCategories: React.Dispatch<
    React.SetStateAction<AttributeBoost[]>
  >;
  selectedClass: string;
}

const AttributeButtons: React.FC<LevelSelectorProps> = ({
  attributeBoostCategories,
  setAttributeBoostCategories,
  selectedClass,
}) => {
  function handleClick(attribute: AttributesType, boostsType: Category): void {
    const currentBoostCategory = attributeBoostCategories.find(
      ({ name }) => name === boostsType
    );

    const currentClass = Classes.find(
      (classItem) => classItem.name === selectedClass
    );

    if (
      currentBoostCategory &&
      currentBoostCategory.name === "Class" &&
      !currentClass?.Attributes.includes(attribute) &&
      !currentBoostCategory.boosts.includes(attribute)
    ) {
      {
        /* Selected Class cannot boost this attribute so dont allow it to be clicked */
      }
      return;
    }
    if (
      currentBoostCategory &&
      !currentBoostCategory.boosts.includes(attribute) &&
      currentBoostCategory.boosts.length < BoostLimits[boostsType]
    ) {
      setAttributeBoostCategories((prev) =>
        prev.map((boost) =>
          boost.name === boostsType
            ? { ...boost, boosts: [...boost.boosts, attribute] }
            : boost
        )
      );
    } else if (
      currentBoostCategory &&
      currentBoostCategory.boosts.includes(attribute)
    ) {
      setAttributeBoostCategories((prev) =>
        prev.map((boost) =>
          boost.name === boostsType
            ? {
                ...boost,
                boosts: boost.boosts.filter((b) => b !== attribute),
              }
            : boost
        )
      );
    }
  }

  //Only show the attributes that are available for the current boost category
  return (
    <>
      {attributeBoostCategories.map((currentAttributeBoostCategory) => (
        <React.Fragment key={currentAttributeBoostCategory.name}>
          <p
            className="mt-6"
            key={currentAttributeBoostCategory.name + "title"}
          >
            {currentAttributeBoostCategory.name}
          </p>
          <div
            className="grid grid-cols-6 gap-1"
            key={currentAttributeBoostCategory.name}
          >
            {Attributes.map((attribute) => (
              <Button
                variant="default"
                key={attribute.name}
                className={`col-span-1 ${
                  attributeBoostCategories.find(
                    ({ name, boosts }) =>
                      name === currentAttributeBoostCategory.name &&
                      boosts.includes(attribute.name)
                  )
                    ? "opacity-100"
                    : "opacity-70"
                }`}
                onClick={() =>
                  handleClick(
                    attribute.name,
                    currentAttributeBoostCategory.name as Category
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
