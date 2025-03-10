import {
  Ancestries,
  Attributes,
  Backgrounds,
  Classes,
  InitialAttributeBoosts,
} from "@/data";
import React, { use, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AttributeBoostsType, AttributesType, Category } from "@/types";

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
  attributeBoostCategories: AttributeBoostsType[];
  setAttributeBoostCategories: React.Dispatch<
    React.SetStateAction<AttributeBoostsType[]>
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
  //Set this true when an ancestry boost is selected that is not on the Ancestry array
  const [restrictAncestryBoosts, setRestrictAncestryBoosts] =
    useState<boolean>(false);

  const [restrictBackgroundBoosts, setRestrictBackgroundBoosts] =
    useState<boolean>(false);

  const ResetAllAttributeBoosts = () => {
    setAttributeBoostCategories(InitialAttributeBoosts);
    setRestrictAncestryBoosts(false);
    setRestrictBackgroundBoosts(false);
  };

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

    //Check if the boost category exists
    if (currentBoostCategory) {
      //Check if we have selected an ancestry boost that is not in the Ancestry array.
      if (
        currentBoostCategory.name === "Ancestry" &&
        !currentAncestry?.Attributes.includes(attribute) &&
        !currentAncestry?.Attributes.includes("Free")
      ) {
        setRestrictAncestryBoosts(true);
      }

      //Check if we have selected a background boost that is not in the Background array
      if (
        currentBoostCategory.name === "Background" &&
        !currentBackground?.Attributes.includes(attribute)
      ) {
        setRestrictBackgroundBoosts(true);
      }

      //Check if we have less than the maximum number of boosts for the current category and that we have clicked on an unallocated boost
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
        handleBoostRemoval(attribute, boostsType);
      }
    }
  }

  function handleBoostRemoval(
    boostedAttribute: AttributesType,
    boostsType: Category
  ): void {
    setAttributeBoostCategories((prev) =>
      prev.map((boost) =>
        boost.name === boostsType
          ? {
              ...boost,
              boosts: boost.boosts.filter((b) => b !== boostedAttribute),
            }
          : boost
      )
    );
    if (
      boostsType === "Ancestry" &&
      !currentAncestry?.Attributes.includes(boostedAttribute)
    ) {
      setRestrictAncestryBoosts(false);
    }
    if (
      boostsType === "Background" &&
      !currentBackground?.Attributes.includes(boostedAttribute)
    ) {
      setRestrictBackgroundBoosts(false);
    }
  }

  function isDisabled(
    currentAttributeBoostCategory: AttributeBoostsType,
    attribute: { name: AttributesType }
  ): boolean {
    if (
      attributeBoostCategories.find(
        ({ name, boosts }) =>
          name === currentAttributeBoostCategory.name &&
          boosts.includes(attribute.name)
      )
    ) {
      return false;
    }
    if (
      currentAttributeBoostCategory.boosts.length >=
        BoostLimits[
          currentAttributeBoostCategory.name as keyof typeof BoostLimits
        ] ||
      (currentAttributeBoostCategory.name === "Ancestry" &&
        restrictAncestryBoosts &&
        !currentAncestry?.Attributes.includes(attribute.name)) ||
      (currentAttributeBoostCategory.name === "Ancestry" &&
        selectedAncestry === "Select Ancestry") ||
      (currentAttributeBoostCategory.name === "Background" &&
        restrictBackgroundBoosts &&
        !currentBackground?.Attributes.includes(attribute.name)) ||
      (currentAttributeBoostCategory.name === "Background" &&
        selectedBackground === "Select Background") ||
      (currentAttributeBoostCategory.name === "Class" &&
        !currentClass?.Attributes.includes(attribute.name))
    ) {
      return true;
    }
    return false;
  }

  function displayAttributes(attributeName: string): string[] {
    switch (attributeName) {
      case "Ancestry":
        return (
          currentAncestry?.Attributes?.map((attribute) => " " + attribute) || []
        );
      case "Background":
        return (
          currentBackground?.Attributes.map((attribute) => " " + attribute) ||
          []
        );
      case "Class":
        return (
          currentClass?.Attributes.map((attribute) => " " + attribute) || []
        );
      default:
        return [];
    }
  }

  //Only show the attributes that are available for the current boost category
  return (
    <>
      <Button className="max-w-44" onClick={ResetAllAttributeBoosts}>
        Reset Attributes
      </Button>
      {attributeBoostCategories.map((currentAttributeBoostCategory) => (
        <React.Fragment key={currentAttributeBoostCategory.name}>
          <p
            className="mt-6"
            key={currentAttributeBoostCategory.name + "title"}
          >
            {currentAttributeBoostCategory.name}
            {displayAttributes(currentAttributeBoostCategory.name)}
          </p>
          <div
            className="grid grid-cols-6 gap-1"
            key={currentAttributeBoostCategory.name}
          >
            {Attributes.map((attribute) => (
              <Button
                variant="default"
                key={attribute.name}
                disabled={isDisabled(currentAttributeBoostCategory, attribute)}
                className={`col-span-1 ${
                  attributeBoostCategories.find(
                    ({ name, boosts }) =>
                      name === currentAttributeBoostCategory.name &&
                      boosts.includes(attribute.name)
                  )
                    ? "opacity-100 border-black text-white"
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
