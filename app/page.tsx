"use client";

import Abilities from "@/components/Abilities";
import LevelSelector from "@/components/LevelSelector";
import Name from "@/components/Name";
import VariantRules from "@/components/VariantRules";
import SkillShowcase from "@/components/SkillShowcase";
import Defences from "@/components/Defences";
import Equipment from "@/components/EquipmentSection/Equipment";

export default function Home() {
  //TODO -
  // Dice Tray
  // Equipment
  // combine useSelector calls into a single call
  // display weapon traits
  // Perception, classDC
  // Spellcasting search

  //BUGFIXES
  // Mobile layout

  return (
    <main className="flex flex-col overflow-hidden lg:px-10">
      <div className="w-full grid items-center justify-center lg:grid-cols-12 lg:gap-16 lg:items-start">
        <div className="grid col-span-4">
          <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-4 mt-8">
            <LevelSelector />
            <Name />
          </div>
          <div className="mt-8 flex flex-col gap-8 items-center lg:items-start">
            <Defences />
            <Abilities />
            <VariantRules />
          </div>
        </div>
        <div className="grid col-span-3 items-center justify-center">
          <SkillShowcase />
        </div>
        <div className="grid col-span-5 pr-4 items-center justify-center">
          <Equipment />
        </div>
      </div>
    </main>
  );
}
