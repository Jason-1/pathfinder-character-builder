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
  // Equipment card bottom cut off

  return (
    <main className="flex flex-col xl:px-6 pb-10 mx-4">
      <div className="w-full grid items-center justify-center xl:grid-cols-12 xl:gap-16 xl:items-start">
        <div className="grid col-span-7 2xl:col-span-4">
          <div className="grid xl:grid-cols-2 grid-cols-1 items-center gap-4 mt-8">
            <LevelSelector />
            <Name />
          </div>
          <div className="mt-8 flex flex-col gap-8 items-center xl:items-start">
            <Defences />
            <Abilities />
            <VariantRules />
            <div className="block 2xl:hidden">
              <SkillShowcase />
            </div>
            <div className="block lg:hidden">
              <Equipment />
            </div>
          </div>
        </div>
        <div className="xl:col-span-3 items-center justify-center 2xl:grid hidden">
          <SkillShowcase />
        </div>
        <div className="xl:col-span-5 items-center justify-center lg:grid hidden">
          <Equipment />
        </div>
      </div>
    </main>
  );
}
