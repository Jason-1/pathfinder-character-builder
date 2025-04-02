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
  // X 3. Skills.
  // X 3.1 Display all skills and their training level
  // 4. Save Character
  // 5. Load Character
  // 6. Equipment
  // 7. Calculate defence and offence

  // Look into RootState

  //BUGFIXES

  return (
    <main className="relative flex flex-col overflow-hidden sm:px-10 px-5">
      <div className="w-full grid grid-cols-4 gap-16">
        <div className="grid col-span-1">
          <div className="grid grid-cols-2 items-center gap-10">
            <LevelSelector />
            <Name />
          </div>
          <AncestrySelector />
          <BackgroundSelector />
          <ClassSelector />
          <Abilities />
          <VariantRules />
        </div>
        <div className="grid col-span-3">
          <SkillShowcase />
        </div>
      </div>
    </main>
  );
}
