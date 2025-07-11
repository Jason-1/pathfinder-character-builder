"use client";

import Abilities from "@/components/Abilities";
import LevelSelector from "@/components/LevelSelector";
import Name from "@/components/Name";
import VariantRules from "@/components/VariantRules";
import SkillShowcase from "@/components/SkillShowcase";
import Defences from "@/components/Defences";
import Equipment from "@/components/EquipmentSection/Equipment";
import DatabaseButtons from "@/components/DatabaseButtons";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectID } from "../redux/selectors";

export default function Home() {
  const router = useRouter();

  const id = useSelector(selectID);

  //------------------------------------------------------------------------------//

  //TODO -
  // Instead of "data not loaded" returns in ancestry, class, background, etc. selectors, create a generic loading component that can be used in all selectors

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (id === null) {
      router.push("/");
    }
  }, []);

  return (
    <main className="flex flex-col xl:px-6 pb-10 mx-4">
      <div className="w-full grid items-center justify-center xl:grid-cols-12 xl:gap-16 xl:items-start">
        <div className="grid col-span-7 xl:col-span-7 3xl:col-span-4">
          <div className="grid xl:grid-cols-2 grid-cols-1 items-center justify-center gap-4 mt-8 xl:max-w-[460px]">
            <LevelSelector />
            <Name />
          </div>
          <div className="mt-8 flex flex-col gap-8 items-center xl:items-start">
            <Defences />
            <Abilities />
            <VariantRules />
            <DatabaseButtons />
            <div className="block 3xl:hidden">
              <SkillShowcase />
            </div>
            <div className="block lg:hidden">
              <Equipment />
            </div>
          </div>
        </div>
        <div className="xl:col-span-3 items-center justify-center 3xl:grid hidden">
          <SkillShowcase />
        </div>
        <div className="xl:col-span-5 items-center justify-center lg:grid hidden">
          <Equipment />
        </div>
      </div>
    </main>
  );
}
