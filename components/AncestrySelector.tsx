"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ancestries } from "@/data";
import { heritiges } from "@/data/heritiges";

interface AncestrySelectorProps {
  selectedAncestry: string;
  setSelectedAncestry: React.Dispatch<React.SetStateAction<string>>;
  selectedHeritage: string;
  setSelectedHeritage: React.Dispatch<React.SetStateAction<string>>;
}

//TODO - Change dropdown menus to selects
//TODO - Make the dropdown menus display cards, initially they are just the title of the heritage. Clicking on the title will display the card with the full description of the heritage. Add a button at the bottom to select the heritage.
//TODO - Potentially use popovers in the selects

const AncestrySelector: React.FC<AncestrySelectorProps> = ({
  selectedAncestry,
  setSelectedAncestry,
  selectedHeritage,
  setSelectedHeritage,
}) => {
  const availableHeritiges = heritiges.filter(
    (heritigeItem) => heritigeItem.ancestryName === selectedAncestry
  );

  return (
    <div className="mt-6 flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {selectedAncestry === "Select Ancestry" ? "" : "Ancestry: "}
          {selectedAncestry}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Ancestries.map((ancestryItem) => (
            <DropdownMenuItem
              key={ancestryItem.name}
              onClick={() => {
                setSelectedAncestry(`${ancestryItem.name}`);
                setSelectedHeritage("Select Heritage");
              }}
            >
              {ancestryItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {selectedHeritage === "Select Heritage" ? "" : "Heritage: "}
          {selectedHeritage}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {availableHeritiges.map((heritigeItem) => (
            <DropdownMenuItem
              key={heritigeItem.heritageName}
              onClick={() => setSelectedHeritage(heritigeItem.heritageName)}
            >
              {heritigeItem.heritageName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AncestrySelector;
