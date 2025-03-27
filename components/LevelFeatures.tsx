import React from "react";
import { useSelector } from "react-redux";

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
import {
  AttributeBoostsType,
  FeatsType,
  skillProficienciesType,
} from "@/types";
import SkillIncreases from "./SkillIncreases";

interface LevelFeaturesProps {
  selectedBackground: string;
  freeArchetype: boolean;
  ancestralParagon: boolean;
  selectedFeats: FeatsType[];
  setSelectedFeats: React.Dispatch<React.SetStateAction<FeatsType[]>>;
  selectedSkills: skillProficienciesType[];
  setSelectedSkills: React.Dispatch<
    React.SetStateAction<skillProficienciesType[]>
  >;
  attributeBoostCategories: AttributeBoostsType[];
}

//use attributeBoostCategories to check if the current level has boosted intelligence. If it has allow a single skill increase

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

const LevelFeatures: React.FC<LevelFeaturesProps> = ({
  selectedBackground,
  freeArchetype,
  ancestralParagon,
  selectedFeats,
  setSelectedFeats,
  selectedSkills,
  setSelectedSkills,
  attributeBoostCategories,
}) => {
  const selectedlevel = useSelector((state: any) => state.level.level);
  const selectedAncestry = useSelector((state: any) => state.ancestry.ancestry);
  const selectedClass = useSelector((state: any) => state.class.class);

  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  function level1Intelligence() {
    let i = 0;
    attributeBoostCategories.forEach((boost) => {
      if (boost.boosts.includes("Intelligence")) {
        if (
          boost.name === "Level5" ||
          boost.name === "Level10" ||
          boost.name === "Level15" ||
          boost.name === "Level20"
        ) {
          return;
        }
        i++;
      }
    });
    return i;
  }

  function intelligenceBoosted(level: number) {
    const boostForCurrentLevel = attributeBoostCategories.find(
      (boost) => boost.name === `Level${level}`
    );
    let initialBoostCount = 4;
    let currentBoostCount = level / 5 + initialBoostCount;
    let totalBoosts = 0;
    let partial = false;
    //Check we boosted intelligence at this level
    if (boostForCurrentLevel?.boosts.includes("Intelligence")) {
      //Check if it was a partial boost
      for (let i = 0; i < currentBoostCount; i++) {
        if (attributeBoostCategories[i].boosts.includes("Intelligence")) {
          if (totalBoosts >= 4 && !partial) {
            partial = true;
          } else {
            totalBoosts++;
            partial = false;
          }
        }
      }
      //Only allow a skill increase if we boosted intelligence at this level and it wasnt a partial boost
      return !partial;
    }
  }

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

  //pass in the correct number of available boosts
  //restrict boosts only to allowed ones where applicable

  return (
    <div className="mt-6">
      {levels.map((level) => (
        <Card
          className={`mt-4 ${
            level <= selectedlevel ? "opacity-100 " : "opacity-50"
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

          {/* Pass in the classes additional skill proficiencies */}
          {/* Add a new training every time an intelligence boost occurs */}

          {/* Additional class boosts, class, background, int */}
          <CardContent>
            {level === 1 && (
              <div className="flex flex-col justify-start items-start">
                <SkillIncreases
                  currentLevel={-1}
                  selectedBackground={selectedBackground}
                  availableBoosts={1}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  increaseHeaderText="Background skill proficiencies"
                  boostType="Background"
                />
                <SkillIncreases
                  currentLevel={0}
                  selectedBackground={selectedBackground}
                  availableBoosts={1}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  increaseHeaderText="Class skill proficiencies"
                  boostType="Class"
                />
                <SkillIncreases
                  currentLevel={level}
                  selectedBackground={selectedBackground}
                  availableBoosts={
                    (selectedClassData?.skills?.additional ?? 0) +
                    level1Intelligence()
                  }
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  increaseHeaderText="Initial skill proficiencies"
                  boostType="Initial"
                />
              </div>
            )}
            {skillIncreaseLevels.includes(level) && (
              <>
                <SkillIncreases
                  currentLevel={level}
                  selectedBackground={selectedBackground}
                  availableBoosts={1}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  increaseHeaderText={`Level ${level} skill proficiency`}
                  boostType="Level"
                />
                <br />
              </>
            )}

            {intelligenceBoosted(level) && (
              <SkillIncreases
                currentLevel={level}
                selectedBackground={selectedBackground}
                availableBoosts={1}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                increaseHeaderText={`Level ${level} intelligence boost`}
                boostType="Intelligence"
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
                    <DialogTrigger className="mt-4">
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
