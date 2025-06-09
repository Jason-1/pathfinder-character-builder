import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClassFeats } from "@/data/classFeats";
import {
  FeatLevels,
  initialHighlightedFeatData,
  skillIncreaseLevels,
} from "@/data";
import { classFeatType, highlightedFeatDataType } from "@/types";
import SkillIncreases from "./SkillIncreases";
import { updateFeat } from "@/app/redux/Slices/selectedFeatsSlice";
import SelectorDialog from "./SelectorDialog";
import {
  selectAncestralParagon,
  selectAncestry,
  selectAttributeBoostCategories,
  selectClass,
  selectFeats,
  selectFreeArchetype,
  selectLevel,
} from "@/app/redux/selectors";

//Create an available feats object I can pass through to the selector dialog

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

const LevelFeatures: React.FC = ({}) => {
  const dispatch = useDispatch();

  //Get required states
  const selectedLevel = useSelector(selectLevel);
  const selectedAncestry = useSelector(selectAncestry);
  const selectedClass = useSelector(selectClass);
  const freeArchetype = useSelector(selectFreeArchetype);
  const ancestralParagon = useSelector(selectAncestralParagon);
  const attributeBoosts = useSelector(selectAttributeBoostCategories);
  const selectedFeats = useSelector(selectFeats);

  //------------------------------------------------------------------------------//

  function level1Intelligence() {
    let i = 0;
    attributeBoosts.forEach((boost) => {
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
    const boostForCurrentLevel = attributeBoosts.find(
      (boost) => boost.name === `Level${level}`
    );
    const initialBoostCount = 4;
    const currentBoostCount = level / 5 + initialBoostCount;
    let totalBoosts = 0;
    let partial = false;
    //Check we boosted intelligence at this level
    if (boostForCurrentLevel?.boosts.includes("Intelligence")) {
      //Check if it was a partial boost
      for (let i = 0; i < currentBoostCount; i++) {
        if (attributeBoosts[i].boosts.includes("Intelligence")) {
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
        return selectedClass.name;
      case "Class":
        return selectedClass.name;
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
    return "";
  }

  const handleSetFeats = (
    level: number,
    featType: string,
    featName: string
  ) => {
    dispatch(updateFeat({ level, featType, featName }));
  };

  function handleClick(
    level: number,
    featType: string,
    featName: string
  ): void {
    handleSetFeats(level, featType, featName);
  }

  //------------------------------------------------------------------------//

  const [highlightedItems, setHighlightedItems] = React.useState<
    highlightedFeatDataType[]
  >(initialHighlightedFeatData);

  const getFilteredFeats = (level: number, featTrait: string) => {
    const filteredFeats = ClassFeats.filter(
      (feats) =>
        feats.level <= level && feats.traits.split(", ").includes(featTrait)
    );
    return filteredFeats;
  };

  const getHighlightedItem = (level: number, featType: string) => {
    const foundHighlightedItem = highlightedItems.find(
      (item) => item.level === level && item.featType === featType
    );

    if (foundHighlightedItem) {
      return foundHighlightedItem.featData;
    }

    // Return a valid fallback object
    return {
      name: "",
      pfs: "",
      source: "",
      rarity: "",
      traits: "",
      level: 0,
      prerequisites: "",
      description: "",
      preview: "",
      "spoilers?": "",
      link: "",
      text: {
        text: "",
        action_cost: "",
      },
    };
  };

  const handleSetHighlightedItem = (
    level: number,
    featType: string,
    featData: classFeatType
  ) => {
    setHighlightedItems((prev) =>
      prev.map((item) =>
        item.level === level && item.featType === featType
          ? { ...item, featData }
          : item
      )
    );
  };

  return (
    <div>
      {levels.map((level) => (
        <Card
          className={`mt-4 ${
            level <= selectedLevel ? "opacity-100 " : "opacity-50"
          }`}
          key={level}
        >
          <CardHeader>
            <CardTitle>Level {level}</CardTitle>
          </CardHeader>

          <CardContent>
            {level === 1 && (
              <div className="flex flex-col justify-start items-start">
                <SkillIncreases
                  currentLevel={-1}
                  availableBoosts={1}
                  increaseHeaderText="Background skill proficiencies"
                  boostType="Background"
                />
                <SkillIncreases
                  currentLevel={0}
                  availableBoosts={1}
                  increaseHeaderText="Class skill proficiencies"
                  boostType="Class"
                />
                <SkillIncreases
                  currentLevel={level}
                  availableBoosts={
                    (selectedClass?.skills?.additional ?? 0) +
                    level1Intelligence()
                  }
                  increaseHeaderText="Initial skill proficiencies"
                  boostType="Initial"
                />
              </div>
            )}
            {skillIncreaseLevels.includes(level) && (
              <>
                <SkillIncreases
                  currentLevel={level}
                  availableBoosts={1}
                  increaseHeaderText={`Level ${level} skill proficiency`}
                  boostType="Level"
                />
                <br />
              </>
            )}

            {intelligenceBoosted(level) && (
              <SkillIncreases
                currentLevel={level}
                availableBoosts={1}
                increaseHeaderText={`Level ${level} intelligence boost`}
                boostType="Intelligence"
              />
            )}

            {/* Loop through every time a feat can be allocated accounting for type of selected class and variant rules */}

            {FeatLevels.find((feat) => feat.level === level)?.feats?.map(
              (feat) =>
                feat.type === "Martial" &&
                selectedClass?.type !== "Martial" ? null : (feat.type ===
                    "Archetype" &&
                    !freeArchetype) ||
                  (feat.type === "Paragon" && !ancestralParagon) ? null : (
                  <div key={feat.type}>
                    {
                      <SelectorDialog
                        className="border rounded-sm hover:border-red-700 p-2 w-full mt-2"
                        itemType="Feat"
                        selectedItem={
                          displayFeatName(level, feat.type)
                            ? displayFeatName(level, feat.type)
                            : displayFeatType(feat.type)
                        }
                        data={getFilteredFeats(
                          level,
                          feat.type === "Martial"
                            ? selectedClass.name
                            : feat.type === "Class"
                            ? selectedClass.name
                            : feat.type === "Ancestry"
                            ? selectedAncestry
                            : feat.type === "Paragon"
                            ? selectedAncestry
                            : feat.type
                        )}
                        highlightedItem={getHighlightedItem(level, feat.type)}
                        onItemClick={(item) =>
                          handleClick(level, feat.type, item)
                        }
                        setHighlightedItem={(featData) =>
                          handleSetHighlightedItem(level, feat.type, featData)
                        }
                      >
                        {getHighlightedItem(level, feat.type).name ? (
                          <div>
                            Level:{" "}
                            {getHighlightedItem(level, feat.type).level || 0}
                          </div>
                        ) : (
                          <div>Select a {selectTrait(feat.type)} feat</div>
                        )}
                      </SelectorDialog>
                    }
                  </div>
                )
            )}
          </CardContent>

          <CardFooter>
            <Accordion className="w-full" type="single" collapsible>
              {selectedClass.name !== "Select Class" &&
                selectedClass?.features &&
                selectedClass?.features.map(
                  (feature) =>
                    level === feature.level && (
                      <AccordionItem key={feature.name} value={feature.name}>
                        <AccordionTrigger>{feature.name}</AccordionTrigger>
                        <AccordionContent>
                          {feature.description}
                        </AccordionContent>
                      </AccordionItem>
                    )
                )}
            </Accordion>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LevelFeatures;
