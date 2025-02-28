import React, { useEffect } from "react";
import { Attributes, InitialAttributeBoosts } from "@/data";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AttributeButtons from "./AttributeButtons";
import { AttributeBoost, AttributesType } from "@/types";

interface LevelSelectorProps {
  selectedLevel: number;
  selectedClass: string;
  selectedAncestry: string;
  selectedBackground: string;
  attributeBoosts: AttributeBoost[];
  setAttributeBoosts: React.Dispatch<React.SetStateAction<AttributeBoost[]>>;
}

const Abilities: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  selectedClass,
  selectedAncestry,
  selectedBackground,
  attributeBoosts,
  setAttributeBoosts,
}) => {
  const ResetAttributeBoosts = (selectedAttributeBoosts: string) => {
    setAttributeBoosts((prev) =>
      prev.map((boost) =>
        boost.name === selectedAttributeBoosts
          ? { ...boost, boosts: [] }
          : boost
      )
    );
  };

  const ResetAllAttributeBoosts = () => {
    setAttributeBoosts(InitialAttributeBoosts);
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
            <DialogDescription className="flex flex-row justify-between">
              Click on the attribute to increase it.
              <Button onClick={ResetAllAttributeBoosts}>
                Reset Attributes
              </Button>
            </DialogDescription>
          </DialogHeader>
          <AttributeButtons
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
            selectedClass={selectedClass}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Abilities;
