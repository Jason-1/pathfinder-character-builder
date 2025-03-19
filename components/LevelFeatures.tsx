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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClassFeats } from "@/data/classFeats";
import {
  Classes,
  Feats,
  skillProficiencies,
  skillIncreaseLevels,
} from "@/data";
import { FeatsType, skillProficienciesType } from "@/types";
import SkillIncreases from "./SkillIncreases";

interface LevelFeaturesProps {
  selectedLevel: number;
  selectedAncestry: string;
  selectedBackground: string;
  selectedClass: string;
  freeArchetype: boolean;
  ancestralParagon: boolean;
  selectedFeats: FeatsType[];
  setSelectedFeats: React.Dispatch<React.SetStateAction<FeatsType[]>>;
  selectedSkills: skillProficienciesType[];
  setSelectedSkills: React.Dispatch<
    React.SetStateAction<skillProficienciesType[]>
  >;
}

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

const LevelFeatures: React.FC<LevelFeaturesProps> = ({
  selectedLevel,
  selectedAncestry,
  selectedBackground,
  selectedClass,
  freeArchetype,
  ancestralParagon,
  selectedFeats,
  setSelectedFeats,
  selectedSkills,
  setSelectedSkills,
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

  function selectTrait(featType: string) {
    switch (featType) {
      case "Martial":
        return selectedClass;
      case "Class":
        return selectedClass;
      case "Archetype":
        return "Archetype";
      case "Ancestry":
        return selectedAncestry;
      case "Paragon":
        return selectedAncestry;
      case "Skill":
        return "Skill";
      case "General":
        return "General";
      default:
        return "";
    }
  }

  function findCurrentFeats(featType: string, currentLevel: number) {
    const selectedTrait = selectTrait(featType);
    const currentFeats = ClassFeats.filter(
      (featItem) =>
        featItem.traits.split(", ").includes(selectedTrait) &&
        featItem.level <= currentLevel
    );

    return currentFeats;
  }

  function displayFeatName(selectedLevel: number, featType: string) {
    const feat = selectedFeats.find((feat) => feat.level === selectedLevel);
    if (feat) {
      const featItem = feat.feats.find(
        (featItem) => featItem.type === featType
      );
      if (featItem) {
        return featItem.selected;
      }
    }
  }

  //TODO - Set the feat when handleClick is called
  function handleClick(
    level: number,
    featType: string,
    featName: string
  ): void {
    setSelectedFeats((prev) =>
      prev.map((currentLevel) => {
        if (currentLevel.level === level) {
          return {
            ...currentLevel,
            feats: currentLevel.feats.map((feat) => {
              if (feat.type === featType) {
                // Return updated feat with new selected value
                return { ...feat, selected: featName };
              }
              // Return original feat if type doesn't match
              return feat;
            }),
          };
        }
        // Return original level if level doesn't match
        return currentLevel;
      })
    );
  }

  //show skill increases only at applicable levels
  //pass in the correct number of available boosts
  //restrict boosts only to allowed ones where applicable

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
            {level === 1 && (
              <SkillIncreases
                currentLevel={level}
                selectedBackground={selectedBackground}
                selectedClass={selectedClass}
                availableBoosts={3}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                increaseHeaderText="Initial skill proficiencies"
              />
            )}
            {skillIncreaseLevels.includes(level) && (
              <SkillIncreases
                currentLevel={level}
                selectedBackground={selectedBackground}
                selectedClass={selectedClass}
                availableBoosts={1}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                increaseHeaderText={`Level ${level} skill proficiency`}
              />
            )}

            {Feats.find((feat) => feat.level === level)?.feats?.map((feat) =>
              feat.type === "Martial" &&
              selectedClassData?.type !== "Martial" ? null : (feat.type ===
                  "Archetype" &&
                  !freeArchetype) ||
                (feat.type === "Paragon" && !ancestralParagon) ? null : (
                <div key={feat.type}>
                  <Dialog>
                    <DialogTrigger>
                      {displayFeatName(level, feat.type)
                        ? displayFeatName(level, feat.type)
                        : displayFeatType(feat.type)}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Select a {selectTrait(feat.type)} feat
                        </DialogTitle>
                        <Accordion type="single" collapsible>
                          {findCurrentFeats(feat.type, level).map((feats) => (
                            <AccordionItem value={feats.name} key={feats.name}>
                              <AccordionTrigger>
                                {feats.name}
                                <br />
                                {" Level: "}
                                {feats.level}
                              </AccordionTrigger>
                              <AccordionContent>
                                <Card>
                                  <CardHeader>
                                    <CardDescription>
                                      {feats.text.text}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent></CardContent>
                                  <CardFooter>
                                    <DialogClose asChild>
                                      <Button
                                        onClick={() =>
                                          handleClick(
                                            level,
                                            feat.type,
                                            feats.name
                                          )
                                        }
                                      >
                                        Confirm Selection
                                      </Button>
                                    </DialogClose>
                                  </CardFooter>
                                </Card>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
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
