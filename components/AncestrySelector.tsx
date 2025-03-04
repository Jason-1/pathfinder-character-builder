"use client";

import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ancestries } from "@/data";

interface AncestrySelectorProps {
  selectedAncestry: string;
  setSelectedAncestry: React.Dispatch<React.SetStateAction<string>>;
}

const AncestrySelector: React.FC<AncestrySelectorProps> = ({
  selectedAncestry,
  setSelectedAncestry,
}) => {
  return (
    <div className="mt-6">
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
              onClick={() => setSelectedAncestry(`${ancestryItem.name}`)}
            >
              {ancestryItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AncestrySelector;
