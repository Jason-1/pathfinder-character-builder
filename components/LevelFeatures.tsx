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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClassFeats } from "@/data";

interface LevelFeaturesProps {
  selectedLevel: number;
  selectedAncestry: string;
  selectedBackground: string;
  selectedClass: string;
}

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

const LevelFeatures: React.FC<LevelFeaturesProps> = ({
  selectedLevel,
  selectedAncestry,
  selectedBackground,
  selectedClass,
}) => {
  const [level2Feat, setLevel2Feat] = useState<string>("");
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
          </CardHeader>
          <CardContent>
            {level % 2 === 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {level2Feat === "Select Ancestry" ? "" : "Class Feat: "}
                  {level2Feat}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {ClassFeats.filter(
                    (feat) => feat.traits === "Fighter" && feat.level <= 2
                  ).map((feat) => (
                    <DropdownMenuItem
                      key={feat.name}
                      onClick={() => setLevel2Feat(`${feat.name}`)}
                    >
                      {feat.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LevelFeatures;
