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

import { Classes } from "@/data";

const ClassSelector = () => {
  const [selectedClass, setSelectedClass] = useState<string>("Select Class");
  return (
    <div className="mt-6">
      <DropdownMenu>
        <DropdownMenuTrigger>{selectedClass}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Classes.map((classItem) => (
            <DropdownMenuItem
              key={classItem.name}
              onClick={() => setSelectedClass(`Class: ${classItem.name}`)}
            >
              {classItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ClassSelector;
