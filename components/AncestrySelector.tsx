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

const AncestrySelector = () => {
  const [selectedAncestry, setSelectedAncestry] =
    useState<string>("Select Ancestry");
  return (
    <div className="mt-6">
      <DropdownMenu>
        <DropdownMenuTrigger>{selectedAncestry}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Ancestries.map((ancestryItem) => (
            <DropdownMenuItem
              key={ancestryItem.name}
              onClick={() => setSelectedAncestry(`Class: ${ancestryItem.name}`)}
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
