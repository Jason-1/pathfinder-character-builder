"use client";

import Abilities from "@/components/Abilities";
import AncestrySelector from "@/components/AncestrySelector";
import BackgroundSelector from "@/components/BackgroundSelector";
import ClassSelector from "@/components/ClassSelector";
import LevelFeatures from "@/components/LevelFeatures";
import LevelSelector from "@/components/LevelSelector";
import Name from "@/components/Name";
import VariantRules from "@/components/VariantRules";
import { InitialAttributeBoosts } from "@/data";
import { AttributeBoostsType } from "@/types";
import { useState } from "react";

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedAncestry, setSelectedAncestry] =
    useState<string>("Select Ancestry");
  const [selectedHeritage, setSelectedHeritage] =
    useState<string>("Select Heritage");
  const [selectedBackground, setSelectedBackground] =
    useState<string>("Select Background");
  const [selectedClass, setSelectedClass] = useState<string>("Select Class");
  const [selectedSubclass, setSelectedSubclass] =
    useState<string>("Select Subclass");
  const [attributeBoostCategories, setAttributeBoostCategories] = useState<
    AttributeBoostsType[]
  >(InitialAttributeBoosts);
  const [freeArchetype, setFreeArchetype] = useState<boolean>(false);
  const [ancestralParagon, setAncestralParagon] = useState<boolean>(false);

  //TODO -
  // 1. Heratige and subclass
  // 1.1 - Add the ability to select a heritage and subclass
  // 1.2 - Give the description of the heritage and subclass when being selected
  // 1.3 - Add the selected heritage and subclass to the applicable levels
  // 2. Selectable feats
  // 3. Skills.
  // 4. Save Character
  // 5. Load Character
  // 6. Equipment
  // 7. Calculate defence and offence

  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Name />
        <LevelSelector
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
        <AncestrySelector
          selectedAncestry={selectedAncestry}
          setSelectedAncestry={setSelectedAncestry}
          selectedHeritage={selectedHeritage}
          setSelectedHeritage={setSelectedHeritage}
        />
        <BackgroundSelector
          selectedBackground={selectedBackground}
          setSelectedBackground={setSelectedBackground}
        />
        <ClassSelector
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          selectedSubclass={selectedSubclass}
          setSelectedSubclass={setSelectedSubclass}
        />
        <Abilities
          selectedLevel={selectedLevel}
          selectedClass={selectedClass}
          selectedAncestry={selectedAncestry}
          selectedBackground={selectedBackground}
          attributeBoostCategories={attributeBoostCategories}
          setAttributeBoostCategories={setAttributeBoostCategories}
        />
        <VariantRules
          freeArchetype={freeArchetype}
          setFreeArchetype={setFreeArchetype}
          ancestralParagon={ancestralParagon}
          setAncestralParagon={setAncestralParagon}
        />
        <LevelFeatures
          selectedLevel={selectedLevel}
          selectedAncestry={selectedAncestry}
          selectedBackground={selectedBackground}
          selectedClass={selectedClass}
          freeArchetype={freeArchetype}
          ancestralParagon={ancestralParagon}
        />
      </div>
    </main>
  );
}
