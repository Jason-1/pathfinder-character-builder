import { Ancestries, Attributes, Backgrounds, Classes } from "@/data";
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
  selectedAncestry: string;
  selectedBackground: string;
  selectedClass: string;
}

const AttributeButtons: React.FC<LevelSelectorProps> = ({
  attributeBoostCategories,
  setAttributeBoostCategories,
  selectedAncestry,
  selectedBackground,
  selectedClass,
}) => {
  const currentAncestry = Ancestries.find(
    (ancestryItem) => ancestryItem.name === selectedAncestry
  );

  const currentBackground = Backgrounds.find(
    (backgroundItem) => backgroundItem.name === selectedBackground
  );

  const currentClass = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  function handleClick(attribute: AttributesType, boostsType: Category): void {
    const currentBoostCategory = attributeBoostCategories.find(
      ({ name }) => name === boostsType
    );

    if (currentBoostCategory) {
      //Check if the selected class can boost the attribute
      if (
        currentBoostCategory.name === "Class" &&
        !currentClass?.Attributes.includes(attribute) &&
        !currentBoostCategory.boosts.includes(attribute)
      ) {
        //Selected Class cannot boost this attribute so dont allow it to be clicked
        return;
      }

      // Every Ancestry has a free boost. Some get 2 boosts. If we have picked an Ancestry boost already check at least one of the selected boosts is from the Attributes array or they get 2 boosts
      if (
        currentBoostCategory.name === "Ancestry" &&
        currentBoostCategory.boosts.length === 1
      ) {
        const selectedBoost = currentBoostCategory.boosts[0];

        //Check if the selected boost is from the Attributes array
        if (
          !currentAncestry?.Attributes.includes(selectedBoost) &&
          !currentAncestry?.Attributes.includes("Free")
        ) {
          //only allow the selection of a boost from the array
          if (
            attribute !== selectedBoost &&
            !currentAncestry?.Attributes.includes(attribute)
          ) {
            return;
          }
        }
      }

      // Only allow 1 free boost. If we have picked a Background boost already check at least one of the selected boosts is from the Attributes array
      if (
        currentBoostCategory.name === "Background" &&
        currentBoostCategory.boosts.length === 1
      ) {
        const selectedBoost = currentBoostCategory.boosts[0];

        //Check if the selected boost is from the Attributes array
        if (!currentBackground?.Attributes.includes(selectedBoost)) {
          //only allow the selection of a boost from the array
          if (
            attribute !== selectedBoost &&
            !currentBackground?.Attributes.includes(attribute)
          ) {
            return;
          }
        }
      }

      //Check if we have less than the maximum number of boosts for the current category
      if (
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
        //if we select an attribute that is already boosted, remove it
      } else if (currentBoostCategory.boosts.includes(attribute)) {
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
                    : currentAttributeBoostCategory.name === "Class" &&
                      !currentClass?.Attributes.includes(attribute.name)
                    ? "opacity-10"
                    : "opacity-75"
                } `}
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
