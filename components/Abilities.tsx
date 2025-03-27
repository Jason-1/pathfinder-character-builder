import React, { useEffect } from "react";
import { Attributes } from "@/data";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AttributeButtons from "./AttributeButtons";
import { AttributeBoostsType, AttributesType } from "@/types";

interface LevelSelectorProps {
  selectedClass: string;
  selectedAncestry: string;
  selectedBackground: string;
  attributeBoostCategories: AttributeBoostsType[];
  setAttributeBoostCategories: React.Dispatch<
    React.SetStateAction<AttributeBoostsType[]>
  >;
}

const Abilities: React.FC<LevelSelectorProps> = ({
  selectedClass,
  selectedAncestry,
  selectedBackground,
  attributeBoostCategories,
  setAttributeBoostCategories,
}) => {
  const currentLevel = useSelector((state: any) => state.level.level);

  const ResetAttributeBoosts = (selectedAttributeBoosts: string) => {
    setAttributeBoostCategories((prev) =>
      prev.map((boost) =>
        boost.name === selectedAttributeBoosts
          ? { ...boost, boosts: [] }
          : boost
      )
    );
  };

  //Reset Ancestry boosts when a new class is selected
  useEffect(() => {
    ResetAttributeBoosts("Ancestry");
  }, [selectedAncestry]);

  //Reset Background boosts when a new class is selected
  useEffect(() => {
    ResetAttributeBoosts("Background");
  }, [selectedBackground]);

  //Reset Class boosts when a new class is selected
  useEffect(() => {
    ResetAttributeBoosts("Class");
  }, [selectedClass]);

  const currentAttributeBoosts = (attributeName: AttributesType): number => {
    let i = 0;
    let partial = false;
    attributeBoostCategories.forEach((boost) => {
      if (boost.boosts.includes(attributeName)) {
        if (
          (boost.name === "Level5" && currentLevel < 5) ||
          (boost.name === "Level10" && currentLevel < 10) ||
          (boost.name === "Level15" && currentLevel < 15) ||
          (boost.name === "Level20" && currentLevel < 20)
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
          <AttributeButtons
            attributeBoostCategories={attributeBoostCategories}
            setAttributeBoostCategories={setAttributeBoostCategories}
            selectedAncestry={selectedAncestry}
            selectedBackground={selectedBackground}
            selectedClass={selectedClass}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Abilities;
