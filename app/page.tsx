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

export default function Home() {
  //TODO -
  // 2.1 - Implement Archetype feats
  // 3. Skills.
  // 3.1 Display all skills and their training level
  // 4. Save Character
  // 5. Load Character
  // 6. Equipment
  // 7. Calculate defence and offence

  // Look into RootState

  //BUGFIXES

  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Name />
        <LevelSelector />
        <AncestrySelector />
        <BackgroundSelector />
        <ClassSelector />
        <Abilities />
        <SkillShowcase />
        <VariantRules />
        <LevelFeatures />
      </div>
    </main>
  );
}
