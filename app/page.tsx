"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "@/server/actions/get-all-characters";
import {
  selectAncestryData,
  selectAncestryDataLoaded,
  selectArmourData,
  selectArmourDataLoaded,
  selectBackgroundData,
  selectBackgroundDataLoaded,
  selectClass,
  selectClassData,
  selectClassDataLoaded,
  selectHeritageData,
  selectHeritageDataLoaded,
  selectID,
  selectSubclassData,
  selectSubclassDataLoaded,
} from "./redux/selectors";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { getClasses } from "@/server/actions/get-all-classes";
import { getAncestries } from "@/server/actions/get-all-ancestries";
import { getHeritages } from "@/server/actions/get-all-heritages";
import { getBackgrounds } from "@/server/actions/get-all-backgrounds";
import { getSubclasses } from "@/server/actions/get-all-subclasses";
import { getArmour } from "@/server/actions/get-all-armour";
import { setAncestryData } from "./redux/Slices/data/ancestryDataSlice";
import { setHeritageData } from "./redux/Slices/data/heritageDataSlice";
import { setBackgroundData } from "./redux/Slices/data/backgroundDataSlice";
import { setClassData } from "./redux/Slices/data/classDataSlice";
import { setSubclassData } from "./redux/Slices/data/subclassDataSlice";
import { setArmourData } from "./redux/Slices/data/armourDataSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector(selectID);

  const ancestries = useSelector(selectAncestryData);
  const ancestriesLoaded = useSelector(selectAncestryDataLoaded);

  const heritages = useSelector(selectHeritageData);
  const heritagesLoaded = useSelector(selectHeritageDataLoaded);

  const backgrounds = useSelector(selectBackgroundData);
  const backgroundsLoaded = useSelector(selectBackgroundDataLoaded);

  const classes = useSelector(selectClassData);
  const classesLoaded = useSelector(selectClassDataLoaded);

  const subclasses = useSelector(selectSubclassData);
  const subclassesLoaded = useSelector(selectSubclassDataLoaded);

  const armour = useSelector(selectArmourData);
  const armourLoaded = useSelector(selectArmourDataLoaded);

  const [characters, setCharacters] = useState<any[]>([]);

  // Fetch characters
  const { execute: fetchCharacters, isExecuting: charactersLoading } =
    useAction(getCharacters, {
      onSuccess: (data) => {
        if (data.data) {
          setCharacters(data.data);
        }
      },
    });

  const { execute: fetchAncestries } = useAction(getAncestries, {
    onSuccess: (data) => {
      if (data.data) {
        dispatch(setAncestryData(data.data));
      }
    },
  });

  const { execute: fetchHeritages } = useAction(getHeritages, {
    onSuccess: (data) => {
      if (data.data) {
        dispatch(setHeritageData(data.data));
      }
    },
  });

  const { execute: fetchBackgrounds, isExecuting: backgroundsLoading } =
    useAction(getBackgrounds, {
      onSuccess: (data) => {
        if (data.data) {
          dispatch(setBackgroundData(data.data));
        }
      },
    });

  const { execute: fetchClasses } = useAction(getClasses, {
    onSuccess: (data) => {
      if (data.data) {
        //Transform null values to undefined

        const transformedData = data.data.map((classData: any) => {
          const transformObject = (obj: any): any => {
            if (obj === null) return undefined;
            if (Array.isArray(obj)) return obj.map(transformObject);
            if (typeof obj === "object") {
              const transformed: any = {};
              for (const [key, value] of Object.entries(obj)) {
                transformed[key] = transformObject(value);
              }
              return transformed;
            }
            return obj;
          };

          return transformObject(classData);
        });

        dispatch(setClassData(transformedData));
      }
    },
  });

  const { execute: fetchSubclasses } = useAction(getSubclasses, {
    onSuccess: (data) => {
      if (data.data) {
        dispatch(setSubclassData(data.data));
      }
    },
  });

  const { execute: fetchArmour } = useAction(getArmour, {
    onSuccess: (data) => {
      if (data.data) {
        dispatch(setArmourData(data.data));
      }
    },
  });

  const isLoading =
    charactersLoading ||
    !ancestriesLoaded ||
    !heritagesLoaded ||
    !backgroundsLoaded ||
    !classesLoaded ||
    !subclassesLoaded ||
    !armourLoaded;

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

  const getHeritageData = (heritageName: string) => {
    return heritages.find((heritage) => heritage.name === heritageName);
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
            const heritageData = getHeritageData(character.heritageName);
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

                {heritageData && (
                  <div className="mt-2">
                    <div>Heritage: {heritageData.name}</div>
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
