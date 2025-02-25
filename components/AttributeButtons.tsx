import { Attributes } from "@/data";
import React from "react";
import { Button } from "./ui/button";

const AttributeButtons = () => {
  return (
    <div className="grid grid-cols-6 gap-1">
      {Attributes.map((attribute) => (
        <Button variant="default" key={attribute.name} className="col-span-1">
          {attribute.name}
        </Button>
      ))}
    </div>
  );
};

export default AttributeButtons;
