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
import { Backgrounds } from "@/data";

interface BackgroundSelectorProps {
  selectedBackground: string;
  setSelectedBackground: React.Dispatch<React.SetStateAction<string>>;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  selectedBackground,
  setSelectedBackground,
}) => {
  return (
    <div className="mt-6 flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {selectedBackground === "Select Background" ? "" : "Background: "}
          {selectedBackground}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Backgrounds.map((backgroundItem) => (
            <DropdownMenuItem
              key={backgroundItem.name}
              onClick={() => setSelectedBackground(`${backgroundItem.name}`)}
            >
              {backgroundItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BackgroundSelector;
