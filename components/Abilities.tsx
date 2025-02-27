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
            boostsType="Ancestry"
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
          />
          <AttributeButtons
            boostsType="Background"
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
          />
          <AttributeButtons
            boostsType="Class"
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
          />
          <AttributeButtons
            boostsType="Initial"
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
          />
          <AttributeButtons
            boostsType="Level5"
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
          />
          <AttributeButtons
            boostsType="Level10"
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
          />
          <AttributeButtons
            boostsType="Level15"
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
          />
          <AttributeButtons
            boostsType="Level20"
            attributeBoosts={attributeBoosts}
            setAttributeBoosts={setAttributeBoosts}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Abilities;
