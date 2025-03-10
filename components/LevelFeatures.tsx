import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClassFeats } from "@/data/classFeats";
import { Classes, Feats } from "@/data";

interface LevelFeaturesProps {
  selectedLevel: number;
  selectedAncestry: string;
  selectedBackground: string;
  selectedClass: string;
  freeArchetype: boolean;
  ancestralParagon: boolean;
}

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

const LevelFeatures: React.FC<LevelFeaturesProps> = ({
  selectedLevel,
  selectedAncestry,
  selectedBackground,
  selectedClass,
  freeArchetype,
  ancestralParagon,
}) => {
  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  function displayFeatType(featType: string) {
    switch (featType) {
      case "Martial":
        return "Class";
      case "Paragon":
        return "Ancestry";
      default:
        return featType;
    }
  }

  return (
    <div className="mt-6">
      {levels.map((level) => (
        <Card
          className={`mt-4 ${
            level <= selectedLevel ? "opacity-100 " : "opacity-50"
          }`}
          key={level}
        >
          <CardHeader>
            <CardTitle>Level {level}</CardTitle>
            {level === 1 && (
              <CardDescription>
                {selectedAncestry === "Select Ancestry" ? (
                  <span className="text-red-700">No Ancestry selected </span>
                ) : (
                  selectedAncestry
                )}{" "}
                {selectedBackground === "Select Background" ? (
                  <span className="text-red-700">No Background selected </span>
                ) : (
                  selectedBackground
                )}{" "}
                {selectedClass === "Select Class" ? (
                  <span className="text-red-700">No Class selected </span>
                ) : (
                  selectedClass
                )}{" "}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent>
            {Feats.find((feat) => feat.level === level)?.feats?.map((feat) =>
              feat.type === "Martial" &&
              selectedClassData?.type !== "Martial" ? null : (feat.type ===
                  "Archetype" &&
                  !freeArchetype) ||
                (feat.type === "Paragon" && !ancestralParagon) ? null : (
                <div key={feat.type}>{displayFeatType(feat.type)}</div>
              )
            )}
          </CardContent>
          <CardFooter>
            {selectedClass !== "Select Class" &&
              selectedClassData?.features && (
                <div>
                  {selectedClassData?.features.map(
                    (feature) =>
                      level === feature.level && (
                        <div key={feature.name}>
                          <div>{feature.name}</div>
                          <div>{feature.description}</div>
                        </div>
                      )
                  )}
                </div>
              )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LevelFeatures;
