"use client";

import Abilities from "@/components/Abilities";
import LevelSelector from "@/components/LevelSelector";
import Name from "@/components/Name";
import VariantRules from "@/components/VariantRules";
import SkillShowcase from "@/components/SkillShowcase";
import Defences from "@/components/Defences";
import Equipment from "@/components/EquipmentSection/Equipment";

import { useAction } from "next-safe-action/hooks";
import { createCharacter } from "@/server/actions/create-character";
import { toast } from "sonner";
import { loadCharacter } from "@/server/actions/load-character";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../redux/Slices/nameSlice";
import { selectName } from "../redux/selectors";
import { updateCharacter } from "@/server/actions/update-character";

export default function Home() {
  //TODO -
  // Dice Tray
  // Equipment
  // combine useSelector calls into a single call
  // display weapon traits
  // Perception, classDC

  // Limit content to the center on extra large screens

  // Start page: New char and load char
  // upon selection either creates a new character in the DB or loads an existing character the redirects to this page

  // Save character data to DB
  // Name slice is called classSlice
  const dispatch = useDispatch();

  const name = useSelector(selectName) || "";

  const { execute: loadCharacterExecute } = useAction(loadCharacter, {
    onSuccess: (data) => {
      if (data.data?.data.name) {
        dispatch(setName(data.data.data.name));
      }
    },
  });

  const { execute } = useAction(createCharacter, {
    onSuccess: (data) => {
      if (data.data) {
        toast.success(`Character "${data.data.data.name}" saved`);
      }
    },
  });

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
            <div>
              <Button onClick={() => execute({ name })}>Save Character</Button>
              <Button onClick={() => loadCharacterExecute({ id: 1 })}>
                Load Character
              </Button>
              <Button onClick={() => updateCharacter({ id: 1, name })}>
                Update Character
              </Button>
            </div>
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
