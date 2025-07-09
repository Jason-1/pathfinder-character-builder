"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "@/server/actions/get-all-characters";
import {
  selectAncestryData,
  selectAncestryDataLoaded,
  selectID,
} from "./redux/selectors";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { any } from "zod";
import { getClasses } from "@/server/actions/get-all-classes";
import { getAncestries } from "@/server/actions/get-all-ancestries";
import { getHeritages } from "@/server/actions/get-all-heritages";
import { getBackgrounds } from "@/server/actions/get-all-backgrounds";
import { setAncestry } from "./redux/Slices/ancestrySlice";
import { setHeritage } from "./redux/Slices/heritageSlice";
import { setBackground } from "./redux/Slices/backgroundSlice";
import { is } from "drizzle-orm";
import { getSubclasses } from "@/server/actions/get-all-subclasses";
import { getArmour } from "@/server/actions/get-all-armour";
import { setAncestryData } from "./redux/Slices/data/ancestryDataSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector(selectID);

  const ancestries = useSelector(selectAncestryData);
  const ancestriesLoaded = useSelector(selectAncestryDataLoaded);

  const [characters, setCharacters] = useState<any[]>([]);

  const [heritages, setHeritages] = useState<any[]>([]);
  const [backgrounds, setBackgrounds] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subclasses, setSubclasses] = useState<any[]>([]);
  const [armour, setArmour] = useState<any[]>([]);

  // Fetch characters
  const { execute: fetchCharacters, isExecuting: charactersLoading } =
    useAction(getCharacters, {
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
  const { execute: fetchAncestries, isExecuting: ancestriesLoading } =
    useAction(getAncestries, {
      onSuccess: (data) => {
        if (data.data) {
          dispatch(setAncestryData(data.data));
        }
      },
    });

  // Fetch classes
  const { execute: fetchHeritages, isExecuting: heritagesLoading } = useAction(
    getHeritages,
    {
      onSuccess: (data) => {
        if (data.data) {
          setHeritages(data.data);
        }
      },
    }
  );

  // Fetch classes
  const { execute: fetchBackgrounds, isExecuting: backgroundsLoading } =
    useAction(getBackgrounds, {
      onSuccess: (data) => {
        if (data.data) {
          setBackgrounds(data.data);
        }
      },
    });

  // Fetch classes
  const { execute: fetchClasses, isExecuting: classesLoading } = useAction(
    getClasses,
    {
      onSuccess: (data) => {
        if (data.data) {
          setClasses(data.data);
        }
      },
    }
  );

  const { execute: fetchSubclasses, isExecuting: subclassesLoading } =
    useAction(getSubclasses, {
      onSuccess: (data) => {
        if (data.data) {
          setSubclasses(data.data);
        }
      },
    });

  const { execute: fetchArmour, isExecuting: armourLoading } = useAction(
    getArmour,
    {
      onSuccess: (data) => {
        if (data.data) {
          setArmour(data.data);
        }
      },
    }
  );

  const isLoading =
    charactersLoading ||
    !ancestriesLoaded ||
    heritagesLoading ||
    backgroundsLoading ||
    classesLoading ||
    subclassesLoading ||
    armourLoading;

  // Fetch both when component mounts
  useEffect(() => {
    fetchCharacters();
    fetchAncestries();
    fetchHeritages();
    fetchBackgrounds();
    fetchClasses();
    fetchSubclasses();
    fetchArmour();
  }, []);

  const getAncestryData = (ancestryName: string) => {
    return ancestries.find((ancestry) => ancestry.name === ancestryName);
  };

  // Helper function to get class data for a character
  const getClassData = (className: string) => {
    return classes.find((cls) => cls.name === className);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome to Pathfinder Character Builder
      </h1>

      {isLoading ? (
        <div>Loading characters...</div>
      ) : (
        <ul className="space-y-4">
          {characters.map((character) => {
            const ancestryData = getAncestryData(character.ancestryName);
            const classData = getClassData(character.className);
            return (
              <li key={character.id} className="border p-4 rounded">
                <div className="font-bold">
                  {character.name} (Level {character.level})
                </div>

                <div>Ancestry: {character.ancestryName}</div>

                {ancestryData && (
                  <div className="mt-2">
                    <div>Ancestry HP: {ancestryData.hp}</div>
                    <div>Size: {ancestryData.size}</div>
                  </div>
                )}

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
      )}

      <div className="flex flex-col gap-2 mt-8">
        <Button onClick={() => {}}>Create new character</Button>
      </div>
    </main>
  );
}
