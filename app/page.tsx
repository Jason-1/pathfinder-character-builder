"use client";

import Abilities from "@/components/Abilities";
import AncestrySelector from "@/components/AncestrySelector";
import BackgroundSelector from "@/components/BackgroundSelector";
import ClassSelector from "@/components/ClassSelector";
import LevelFeatures from "@/components/LevelFeatures";
import LevelSelector from "@/components/LevelSelector";
import Name from "@/components/Name";
import { InitialAttributeBoosts } from "@/data";
import { AttributeBoost } from "@/types";
import { useState } from "react";

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedAncestry, setSelectedAncestry] =
    useState<string>("Select Ancestry");
  const [selectedBackground, setSelectedBackground] =
    useState<string>("Select Background");
  const [selectedClass, setSelectedClass] = useState<string>("Select Class");
  const [attributeBoostCategories, setAttributeBoostCategories] = useState<
    AttributeBoost[]
  >(InitialAttributeBoosts);

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
        />
        <BackgroundSelector
          selectedBackground={selectedBackground}
          setSelectedBackground={setSelectedBackground}
        />
        <ClassSelector
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
        <Abilities
          selectedLevel={selectedLevel}
          selectedClass={selectedClass}
          selectedAncestry={selectedAncestry}
          selectedBackground={selectedBackground}
          attributeBoostCategories={attributeBoostCategories}
          setAttributeBoostCategories={setAttributeBoostCategories}
        />
        <LevelFeatures
          selectedLevel={selectedLevel}
          selectedAncestry={selectedAncestry}
          selectedBackground={selectedBackground}
          selectedClass={selectedClass}
        />
      </div>
    </main>
  );
}
