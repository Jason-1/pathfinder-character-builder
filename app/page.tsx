"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "@/server/actions/get-all-characters";
import { selectID } from "./redux/selectors";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { any } from "zod";
import { getClasses } from "@/server/actions/get-all-classes";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector(selectID);

  const [characters, setCharacters] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  // Fetch characters
  const { execute: fetchCharacters } = useAction(getCharacters, {
    onSuccess: (data) => {
      if (data.data) {
        setCharacters(data.data);
      }
    },
  });

  //Store all classes in redux. I can then load from there in the actual editor instead of fetching again.
  //Only do this for smaller datasets, e.g. classes

  //use isExecuting and hasSucceeded to ensure everything has loaded before moving to the editor

  // Fetch classes
  const { execute: fetchClasses } = useAction(getClasses, {
    onSuccess: (data) => {
      if (data.data) {
        setClasses(data.data);
      }
    },
  });

  // Fetch both when component mounts
  useEffect(() => {
    fetchCharacters();
    fetchClasses();
  }, []);

  // Helper function to get class data for a character
  const getClassData = (className: string) => {
    return classes.find((cls) => cls.name === className);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome to Pathfinder Character Builder
      </h1>

      <ul className="space-y-4">
        {characters.map((character) => {
          const classData = getClassData(character.className);
          return (
            <li key={character.id} className="border p-4 rounded">
              <div className="font-bold">
                {character.name} (Level {character.level})
              </div>
              <div>Class: {character.className}</div>

              {/* Display class attributes */}
              {classData && (
                <div className="mt-2">
                  <div>Hit Points: {classData.hp}</div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-2 mt-8">
        <Button onClick={() => {}}>Create new character</Button>
      </div>
    </main>
  );
}
