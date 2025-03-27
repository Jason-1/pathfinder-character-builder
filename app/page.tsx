"use client";

import Abilities from "@/components/Abilities";
import AncestrySelector from "@/components/AncestrySelector";
import BackgroundSelector from "@/components/BackgroundSelector";
import ClassSelector from "@/components/ClassSelector";
import LevelFeatures from "@/components/LevelFeatures";
import LevelSelector from "@/components/LevelSelector";
import Name from "@/components/Name";
import VariantRules from "@/components/VariantRules";
import SkillShowcase from "@/components/SkillShowcase";
import { Feats, InitialAttributeBoosts, skillProficiencies } from "@/data";
import {
  AttributeBoostsType,
  FeatsType,
  skillProficienciesType,
} from "@/types";
import { useState } from "react";

export default function Home() {
  const [selectedSubclass, setSelectedSubclass] =
    useState<string>("Select Subclass");
  const [attributeBoostCategories, setAttributeBoostCategories] = useState<
    AttributeBoostsType[]
  >(InitialAttributeBoosts);
  const [selectedFeats, setSelectedFeats] = useState<FeatsType[]>(Feats);
  const [freeArchetype, setFreeArchetype] = useState<boolean>(false);
  const [ancestralParagon, setAncestralParagon] = useState<boolean>(false);
  const [selectedSkills, setSelectedSkills] =
    useState<skillProficienciesType[]>(skillProficiencies);

  //TODO -
  // If class is changed, reset all skill selections
  // 2.1 - Implement Archetype feats
  // 3. Skills.
  // 3.1 Display all skills and their training level
  // 4. Save Character
  // 5. Load Character
  // 6. Equipment
  // 7. Calculate defence and offence

  //Address code smell

  //Resetting attributes needs to reset int skill boosts

  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Name />
        <LevelSelector />
        <AncestrySelector />
        <BackgroundSelector />
        <ClassSelector
          selectedSubclass={selectedSubclass}
          setSelectedSubclass={setSelectedSubclass}
        />
        <Abilities
          attributeBoostCategories={attributeBoostCategories}
          setAttributeBoostCategories={setAttributeBoostCategories}
        />
        <SkillShowcase selectedSkills={selectedSkills} />
        <VariantRules
          freeArchetype={freeArchetype}
          setFreeArchetype={setFreeArchetype}
          ancestralParagon={ancestralParagon}
          setAncestralParagon={setAncestralParagon}
        />
        <LevelFeatures
          freeArchetype={freeArchetype}
          ancestralParagon={ancestralParagon}
          selectedFeats={selectedFeats}
          setSelectedFeats={setSelectedFeats}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          attributeBoostCategories={attributeBoostCategories}
        />
      </div>
    </main>
  );
}
