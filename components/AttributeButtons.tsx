import { Ancestries, Attributes, Backgrounds, Classes } from "@/data";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { AttributeBoostsType, AttributesType, Category } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAttributeBoost,
  resetAttributeBoosts,
  setAttributeBoost,
} from "@/app/redux/Slices/attributeBoostCategoriesSlice";
import {
  resetAllIntelligenceBoosts,
  resetAllSkillBoosts,
} from "@/app/redux/Slices/selectedSkillsSlice";
import {
  selectAncestry,
  selectAttributeBoostCategories,
  selectBackground,
  selectClass,
} from "@/app/redux/selectors";

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

const AttributeButtons: React.FC = ({}) => {
  const dispatch = useDispatch();

  //Set this true when an ancestry boost is selected that is not on the Ancestry array
  const [restrictAncestryBoosts, setRestrictAncestryBoosts] =
    useState<boolean>(false);
  const [restrictBackgroundBoosts, setRestrictBackgroundBoosts] =
    useState<boolean>(false);

  const selectedAncestry = useSelector(selectAncestry);
  const selectedBackground = useSelector(selectBackground);
  const selectedClass = useSelector(selectClass);
  const attributeBoosts = useSelector(selectAttributeBoostCategories);

  //------------------------------------------------------------------------------//

  const ResetAllAttributeBoosts = () => {
    dispatch(resetAttributeBoosts());
    dispatch(resetAllSkillBoosts());
    setRestrictAncestryBoosts(false);
    setRestrictBackgroundBoosts(false);
  };

  const handleSetAttributes = (
    boostType: Category,
    attribute: AttributesType
  ) => {
    dispatch(setAttributeBoost({ boostType, attribute }));
  };

  const handleRemoveAttribute = (
    boostType: Category,
    attribute: AttributesType
  ) => {
    dispatch(removeAttributeBoost({ boostType, attribute }));
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
    const currentBoostCategory = attributeBoosts.find(
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
        handleSetAttributes(boostsType, attribute);

        //if we select an attribute that is already boosted, remove it
      } else if (currentBoostCategory.boosts.includes(attribute)) {
        handleBoostRemoval(boostsType, attribute);
      }
    }
  }

  function handleBoostRemoval(
    boostsType: Category,
    boostedAttribute: AttributesType
  ): void {
    handleRemoveAttribute(boostsType, boostedAttribute);

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
    //if the removed boost is intelligence and is level5 or later, just remove int boosts. If it is earlier we need to reset skills
    if (boostedAttribute === "Intelligence") {
      if (
        boostsType === "Level5" ||
        boostsType === "Level10" ||
        boostsType === "Level15" ||
        boostsType === "Level20"
      ) {
        dispatch(resetAllIntelligenceBoosts());
      } else {
        dispatch(resetAllSkillBoosts());
      }
    }
  }

  function isDisabled(
    currentAttributeBoostCategory: AttributeBoostsType,
    attribute: { name: AttributesType }
  ): boolean {
    if (
      attributeBoosts.find(
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
      {attributeBoosts.map((currentAttributeBoostCategory) => (
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
                className={`col-span-1  ${
                  attributeBoosts.find(
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
                <span className="block lg:hidden">
                  {attribute.name.slice(0, 3)}
                </span>
                <span className="hidden lg:block">{attribute.name}</span>
              </Button>
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default AttributeButtons;
