import AncestrySelector from "@/components/AncestrySelector";
import BackgroundSelector from "@/components/BackgroundSelector";
import ClassSelector from "@/components/ClassSelector";
import LevelSelector from "@/components/LevelSelector";
import Name from "@/components/Name";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Name />
        <LevelSelector />
        <AncestrySelector />
        <BackgroundSelector />
        <ClassSelector />
      </div>
    </main>
  );
}
