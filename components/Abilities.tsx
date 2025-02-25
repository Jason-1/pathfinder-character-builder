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

interface LevelSelectorProps {
  selectedLevel: number;
}

const Abilities: React.FC<LevelSelectorProps> = (selectedLevel) => {
  return (
    <div className="grid grid-cols-2 gap-1 mt-6">
      {Attributes.map((attribute) => (
        <Button variant="default" key={attribute.name} className="col-span-1">
          {attribute.name} 0
        </Button>
      ))}
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent
          className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
        >
          <DialogHeader>
            <DialogTitle>Attributes</DialogTitle>
            <DialogDescription>
              Click on the attribute to increase it.
            </DialogDescription>
          </DialogHeader>
          <p className="mt-6">Ancestry</p>
          <AttributeButtons />
          <p className="mt-6">Background</p>
          <AttributeButtons />
          <p className="mt-6">Class</p>
          <AttributeButtons />
          <p className="mt-6">Initial</p>
          <AttributeButtons />
          <p className="mt-6">Level 5</p>
          <AttributeButtons />
          <p className="mt-6">Level 10</p>
          <AttributeButtons />
          <p className="mt-6">Level 15</p>
          <AttributeButtons />
          <p className="mt-6">Level 20</p>
          <AttributeButtons />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Abilities;
