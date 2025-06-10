"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { createCharacter } from "@/server/actions/create-character";
import { toast } from "sonner";
import { loadCharacter } from "@/server/actions/load-character";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "./redux/Slices/nameSlice";
import { setId } from "./redux/Slices/idSlice";
import { useEffect, useState } from "react";
import { getCharacters } from "@/server/actions/get-all-characters";
import { selectID } from "./redux/selectors";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCharacter } from "@/server/actions/delete-character";
import { setLevel } from "./redux/Slices/levelSlice";
import { setArmour } from "./redux/Slices/armourSlice";
import { armourItemType, ClassType, subclassType } from "@/types";
import { getArmour } from "@/server/actions/get-all-armour";
import { getClasses } from "@/server/actions/get-all-classes";
import { setClass } from "./redux/Slices/classSlice";
import {
  initialArmourState,
  initialClassState,
  initialSubclassState,
} from "./redux/initialStates";
import { getSubclasses } from "@/server/actions/get-all-subclasses";
import { setSubclass } from "./redux/Slices/subclassSlice";
import { set } from "zod";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const id = useSelector(selectID);

  const [characters, setCharacters] = useState<
    { id: number; name: string; level: number; className: string }[]
  >([]);

  const [highlightedCharacter, setHighlightedCharacter] = useState<
    number | null
  >(null);

  const [classData, setClassData] = useState<ClassType[]>([]);
  const [pendingClassName, setPendingClassName] = useState<string | null>(null);

  const [subclassData, setSubclassData] = useState<subclassType[]>([]);
  const [pendingSubclassName, setPendingSubclassName] = useState<string | null>(
    null
  );

  const [armourData, setArmourData] = useState<armourItemType[]>([]);
  const [pendingArmourName, setPendingArmourName] = useState<string | null>(
    null
  );

  //------------------------------------------------------------------------------//

  // Reset all states when returning to this page
  useEffect(() => {
    dispatch(setName(""));
    dispatch(setId(null));
    dispatch(setLevel(1));
    dispatch(setClass(initialClassState));
    dispatch(setSubclass(initialSubclassState));
    dispatch(setArmour(initialArmourState));
  }, [dispatch]);

  const { execute: getAllCharacters } = useAction(getCharacters, {
    onSuccess: (data) => {
      if (data.data) {
        setCharacters(data.data);
      }
    },
  });

  const { execute: getAllClasses } = useAction(getClasses, {
    onSuccess: (data) => {
      if (data.data) {
        setClassData(data.data as ClassType[]);
      }
    },
  });

  const { execute: getAllArmour } = useAction(getArmour, {
    onSuccess: (data) => {
      if (data.data) {
        setArmourData(
          data.data.map((item: any) => ({
            ...item,
            category: item.category as armourItemType["category"],
          }))
        );
      }
    },
  });

  const { execute: getAllSubclasses } = useAction(getSubclasses, {
    onSuccess: (data) => {
      if (data.data) {
        setSubclassData(data.data as subclassType[]);
      }
    },
  });

  useEffect(() => {
    getAllSubclasses();
  }, [getAllSubclasses]);

  const handleSetClass = (className: string) => {
    const classItem = classData.find((item) => item.name === className);
    if (classItem) {
      dispatch(setClass(classItem));
    }
  };

  const handleSetSubclass = (subclassName: string) => {
    const subclassItem = subclassData.find(
      (item) => item.name === subclassName
    );
    if (subclassItem) {
      dispatch(setSubclass(subclassItem));
    }
  };

  const handleSetArmour = (armourName: string) => {
    const armourItem = armourData.find((item) => item.name === armourName);
    if (armourItem) {
      dispatch(setArmour(armourItem));
    }
  };

  const { execute: loadCharacterExecute } = useAction(loadCharacter, {
    onSuccess: (data) => {
      if (data.data?.id) {
        toast.success(`Character "${data.data.name}" loaded successfully!`);
        dispatch(setName(data.data.name));
        dispatch(setId(data.data.id));
        dispatch(setLevel(data.data.level));
        setPendingClassName(data.data.className);
        setPendingSubclassName(data.data.subclassName);
        setPendingArmourName(data.data.armourName);
        router.push("/character-builder");
      }
    },
  });

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

  const handleSetID = (id: number) => {
    dispatch(setId(id));
  };

  useEffect(() => {
    getAllCharacters();
  }, [getAllCharacters]);

  useEffect(() => {
    if (pendingClassName && classData.length > 0) {
      handleSetClass(pendingClassName);
      setPendingClassName(null); // clear after setting
    }
  }, [pendingClassName, classData]);

  useEffect(() => {
    getAllClasses();
  }, [getAllClasses]);

  useEffect(() => {
    if (pendingSubclassName && subclassData.length > 0) {
      handleSetSubclass(pendingSubclassName);
      setPendingSubclassName(null); // clear after setting
    }
  }, [pendingSubclassName, subclassData]);

  useEffect(() => {
    getAllClasses();
  }, [getAllClasses]);

  // Ensure the armour data has loaded
  useEffect(() => {
    if (pendingArmourName && armourData.length > 0) {
      handleSetArmour(pendingArmourName);
      setPendingArmourName(null); // clear after setting
    }
  }, [pendingArmourName, armourData]);

  useEffect(() => {
    getAllArmour();
  }, [getAllArmour]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome to Pathfinder Character Builder
      </h1>
      <Button
        onClick={() => {
          createCharacterExecute({ name: "" });
        }}
      >
        Create new character
      </Button>

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
                    id && loadCharacterExecute({ id });
                  }}
                >
                  <span className="select-none">
                    {char.name}: Level: {char.level} {char.className}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-row gap-4 items-center justify-center w-full">
            <Button
              className="w-full"
              onClick={() => {
                id && loadCharacterExecute({ id });
              }}
              disabled={!id}
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
                        getAllCharacters();
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
    </main>
  );
}
