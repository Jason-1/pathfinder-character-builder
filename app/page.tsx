"use client";

import Abilities from "@/components/Abilities";
import LevelSelector from "@/components/LevelSelector";
import Name from "@/components/Name";
import VariantRules from "@/components/VariantRules";
import SkillShowcase from "@/components/SkillShowcase";
import Defences from "@/components/Defences";

export default function Home() {
  //TODO -
  // Add HP to class and ancestry, calculate HP
  // Calculate defence and offence
  // Equipment
  // Save Character
  // Load Character

  return (
    <main className="relative flex flex-col overflow-hidden sm:px-10 px-5">
      <div className="w-full grid grid-cols-12 gap-16">
        <div className="grid col-span-4">
          <div className="grid grid-cols-2 items-center gap-10">
            <LevelSelector />
            <Name />
          </div>
          <Defences />
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
