import React from "react";
import { Attributes } from "@/data";
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
  attributeBoosts: AttributeBoost[];
  setAttributeBoosts: React.Dispatch<React.SetStateAction<AttributeBoost[]>>;
}

const Abilities: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  attributeBoosts,
  setAttributeBoosts,
}) => {
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
        <DialogTrigger>Open</DialogTrigger>
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
            selectedLevel={selectedLevel}
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Abilities;
