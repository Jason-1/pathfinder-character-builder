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

interface ClassSelectorProps {
  selectedClass: string;
  setSelectedClass: React.Dispatch<React.SetStateAction<string>>;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({
  selectedClass,
  setSelectedClass,
}) => {
  return (
    <div className="mt-6">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {selectedClass === "Select Class" ? "" : "Class: "}
          {selectedClass}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Classes.map((classItem) => (
            <DropdownMenuItem
              key={classItem.name}
              onClick={() => setSelectedClass(`${classItem.name}`)}
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
