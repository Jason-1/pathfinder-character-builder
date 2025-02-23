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

const BackgroundSelector = () => {
  const [selectedBackground, setSelectedBackground] =
    useState<string>("Select Background");
  return (
    <div className="mt-6">
      <DropdownMenu>
        <DropdownMenuTrigger>{selectedBackground}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Backgrounds.map((backgroundItem) => (
            <DropdownMenuItem
              key={backgroundItem.name}
              onClick={() =>
                setSelectedBackground(`Background: ${backgroundItem.name}`)
              }
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
