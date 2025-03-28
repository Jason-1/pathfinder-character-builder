import React, { useEffect } from "react";
import { Attributes } from "@/data";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AttributeButtons from "./AttributeButtons";
import { AttributeBoostsType, AttributesType, Category } from "@/types";
import { resetSpecificAttributeBoost } from "@/app/Slices/attributeBoostCategoriesSlice";

const Abilities: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedLevel = useSelector((state: any) => state.level.level);
  const selectedAncestry = useSelector((state: any) => state.ancestry.ancestry);
  const selectedClass = useSelector((state: any) => state.class.class);
  const selectedBackground = useSelector(
    (state: any) => state.background.background
  );

  const attributeBoosts = useSelector(
    (state: { attributeBoostCategories: AttributeBoostsType[] }) =>
      state.attributeBoostCategories
  );

  const handleResetAttributes = (attribute: Category) => {
    dispatch(resetSpecificAttributeBoost(attribute));
  };

  //Reset Ancestry boosts when a new class is selected
  useEffect(() => {
    handleResetAttributes("Ancestry");
  }, [selectedAncestry]);

  //Reset Background boosts when a new class is selected
  useEffect(() => {
    handleResetAttributes("Background");
  }, [selectedBackground]);

  //Reset Class boosts when a new class is selected
  useEffect(() => {
    handleResetAttributes("Class");
  }, [selectedClass]);

  const currentAttributeBoosts = (attributeName: AttributesType): number => {
    let i = 0;
    let partial = false;
    attributeBoosts.forEach((boost) => {
      if (boost.boosts.includes(attributeName)) {
        if (
          (boost.name === "Level5" && selectedLevel < 5) ||
          (boost.name === "Level10" && selectedLevel < 10) ||
          (boost.name === "Level15" && selectedLevel < 15) ||
          (boost.name === "Level20" && selectedLevel < 20)
        ) {
          return;
        }
        if (i >= 4 && !partial) {
          partial = true;
        } else {
          i++;
          partial = false;
        }
      }
    });
    return i;
  };

  return (
    <div className="grid grid-cols-2 gap-1 mt-6">
      {Attributes.map((attribute) => (
        <Button variant="default" key={attribute.name} className="col-span-1">
          {attribute.name}: {currentAttributeBoosts(attribute.name)}
        </Button>
      ))}
      <Dialog>
        <DialogTrigger>Modify Attributes</DialogTrigger>
        <DialogContent
          className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
        >
          <DialogHeader>
            <DialogTitle>Attributes </DialogTitle>
            <DialogDescription>
              Click on the attribute to increase it.
            </DialogDescription>
          </DialogHeader>
          <AttributeButtons />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Abilities;
