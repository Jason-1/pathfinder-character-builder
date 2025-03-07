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
  selectedSubclass: string;
  setSelectedSubclass: React.Dispatch<React.SetStateAction<string>>;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({
  selectedClass,
  setSelectedClass,
  selectedSubclass,
  setSelectedSubclass,
}) => {
  const currentClass = Classes.find(
    (currentClass) => currentClass.name === selectedClass
  );

  return (
    <div className="mt-6 flex flex-col">
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
              onClick={() => {
                setSelectedClass(`${classItem.name}`);
                setSelectedSubclass("Select Subclass");
              }}
            >
              {classItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {selectedSubclass === "Select Subclass" ? "" : "Class: "}
          {selectedSubclass}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Subclasses</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {currentClass?.subclasses && currentClass?.subclasses.length > 0 ? (
            currentClass?.subclasses.map((subClass) => (
              <DropdownMenuItem
                key={subClass}
                onClick={() => setSelectedSubclass(`${subClass}`)}
              >
                {subClass}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>
              No Subclasses Avaialble
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ClassSelector;
