import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
            <p>Card Content</p>
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
