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
import { createCharacter } from "@/server/actions/create-character";
import { toast } from "sonner";
import { setId } from "./redux/Slices/idSlice";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCharacter } from "@/server/actions/delete-character";
import { loadCharacter } from "@/server/actions/load-character";
import { setName } from "./redux/Slices/nameSlice";
import { setLevel } from "./redux/Slices/levelSlice";
import { setAncestry } from "./redux/Slices/ancestrySlice";
import { setBackground } from "./redux/Slices/backgroundSlice";
import { setClass } from "./redux/Slices/classSlice";
import { setHeritage } from "./redux/Slices/heritageSlice";
import { setSubclass } from "./redux/Slices/subclassSlice";
import {
  initialAncestryState,
  initialBackgroundState,
  initialClassState,
  initialHeritageState,
  initialSubclassState,
} from "./redux/initialStates";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector(selectID);

  const [highlightedCharacter, setHighlightedCharacter] = useState<
    number | null
  >(null);

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

  //------------------------------------------------------------------------------//
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

  const { execute: fetchBackgrounds } = useAction(getBackgrounds, {
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

  //------------------------------------------------------------------------------//
  //Check if any of the data is still loading
  const isLoading =
    charactersLoading ||
    !ancestriesLoaded ||
    !heritagesLoaded ||
    !backgroundsLoaded ||
    !classesLoaded ||
    !subclassesLoaded ||
    !armourLoaded;

  //Fetch all data when component mounts
  useEffect(() => {
    fetchCharacters();
    fetchAncestries();
    fetchHeritages();
    fetchBackgrounds();
    fetchClasses();
    fetchSubclasses();
    fetchArmour();
  }, []);

  //Reset character state when component mounts
  useEffect(() => {
    dispatch(setId(null));
    dispatch(setLevel(1));
    dispatch(setName(""));
    dispatch(setAncestry(initialAncestryState));
    dispatch(setHeritage(initialHeritageState));
    dispatch(setBackground(initialBackgroundState));
    dispatch(setClass(initialClassState));
    dispatch(setSubclass(initialSubclassState));
  }, []);

  //------------------------------------------------------------------------------//
  //Character Creation and deletion
  const { execute: createCharacterExecute } = useAction(createCharacter, {
    onSuccess: (data) => {
      if (data.data) {
        toast.success(`New character created`);
        dispatch(setId(data.data.id));
        router.push("/character-builder");
      }
    },
  });

  const { execute: deleteCharacterExecute } = useAction(deleteCharacter, {
    onSuccess: (data) => {
      if (data.data) {
        toast.success(`Character "${data.data.name}" deleted successfully!`);
        router.push("/");
      }
    },
  });

  //------------------------------------------------------------------------------//
  //Character Loading and helper functions

  const getAncestry = (ancestryName: string) => {
    const ancestryObject = ancestries.find(
      (ancestry) => ancestry.name === ancestryName
    );

    return ancestryObject || null;
  };

  const getHeritage = (heritageName: string | null) => {
    const heritageObject = heritages.find(
      (heritage) => heritage.name === heritageName
    );

    return heritageObject || null;
  };

  const getBackground = (backgroundName: string | null) => {
    const backgroundObject = backgrounds.find(
      (background) => background.name === backgroundName
    );

    return backgroundObject || null;
  };

  const getClass = (className: string | null) => {
    const classObject = classes.find((cls) => cls.name === className);

    return classObject || null;
  };

  const getSubclass = (subclassName: string | null) => {
    const subclassObject = subclasses.find(
      (subclass) => subclass.name === subclassName
    );

    return subclassObject || null;
  };

  const { execute: loadCharacterExecute } = useAction(loadCharacter, {
    onSuccess: (data) => {
      if (data.data?.id) {
        toast.success(`Character "${data.data.name}" loaded successfully!`);
        dispatch(setId(data.data.id));
        dispatch(setName(data.data.name));
        dispatch(setLevel(data.data.level));

        const ancestry = getAncestry(data.data.ancestryName);
        if (ancestry) {
          dispatch(setAncestry(ancestry));
        }

        const heritage = getHeritage(data.data.heritageName);
        if (heritage) {
          dispatch(setHeritage(heritage));
        }

        const background = getBackground(data.data.backgroundName);
        if (background) {
          dispatch(setBackground(background));
        }

        const characterClass = getClass(data.data.className);
        if (characterClass) {
          dispatch(setClass(characterClass));
        }

        const characterSubclass = getSubclass(data.data.subclassName);
        if (characterSubclass) {
          dispatch(setSubclass(characterSubclass));
        }

        router.push("/character-builder");
      }
    },
  });

  //------------------------------------------------------------------------------//

  const handleSetID = (id: number) => {
    dispatch(setId(id));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome to Pathfinder Character Builder
      </h1>

      <Dialog>
        <DialogTrigger>
          <span className="mt-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            Load existing character
          </span>
        </DialogTrigger>
        <DialogContent className="w-full max-w-full md:w-1/3 h-3/4 max-h-[75vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select a character to load</DialogTitle>{" "}
          </DialogHeader>
          <div className="h-full overflow-y-auto border">
            {isLoading ? (
              <div>Loading Characters...</div>
            ) : characters.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  No characters found. Create your first character!
                </div>
              </div>
            ) : (
              <ul>
                {characters.map((char) => (
                  <li
                    className={`${
                      highlightedCharacter === char.id
                        ? "bg-gray-400"
                        : "hover:bg-gray-800"
                    } cursor-pointer `}
                    key={char.id}
                    onClick={() => {
                      handleSetID(char.id);
                      setHighlightedCharacter(char.id);
                    }}
                    onDoubleClick={() => {
                      id && loadCharacterExecute({ id: char.id });
                    }}
                  >
                    <span className="select-none">
                      {char.name || "Unnamed Adventurer"}: Level: {char.level}{" "}
                      {char.ancestryName} {char.className}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-row gap-4 items-center justify-center w-full">
            <Button
              className="w-full"
              onClick={() => {
                highlightedCharacter &&
                  loadCharacterExecute({ id: highlightedCharacter });
              }}
              disabled={!highlightedCharacter}
            >
              Confirm Selection
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <span className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2">
                  Delete Character
                </span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete{" "}
                    {characters.find((char) => char.id === id)?.name ||
                      "that which has no name"}
                    ?
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-row gap-4 items-center justify-center w-full">
                  <DialogClose asChild>
                    <span
                      className="cursor-pointer w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2"
                      onClick={() => {
                        id && deleteCharacterExecute({ id });
                        fetchCharacters();
                      }}
                    >
                      Yes
                    </span>
                  </DialogClose>
                  <DialogClose asChild>
                    <span className="cursor-pointer w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                      No
                    </span>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-2 mt-8">
        <Button
          onClick={() => {
            createCharacterExecute({ name: "" });
          }}
        >
          Create new character
        </Button>
      </div>
    </main>
  );
}
