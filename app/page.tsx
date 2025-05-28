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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const id = useSelector(selectID);

  const [characters, setCharacters] = useState<{ id: number; name: string }[]>(
    []
  );
  const [highlightedCharacter, setHighlightedCharacter] = useState<
    number | null
  >(null);
  const { execute: getAllCharacters } = useAction(getCharacters, {
    onSuccess: (data) => {
      if (data.data) {
        setCharacters(data.data);
      }
    },
  });

  useEffect(() => {
    getAllCharacters();
  }, [getAllCharacters]);

  const { execute: loadCharacterExecute } = useAction(loadCharacter, {
    onSuccess: (data) => {
      if (data.data?.name) {
        dispatch(setName(data.data.name));
        dispatch(setId(data.data.id));
        router.push("/character-builder");
      }
    },
  });

  const { execute: createCharacterExecute } = useAction(createCharacter, {
    onSuccess: (data) => {
      if (data.data) {
        toast.success(`Character "${data.data.name}" created`);
        dispatch(setId(data.data.id));
        router.push("/character-builder");
      }
    },
  });

  const handleSetID = (id: number) => {
    dispatch(setId(id));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
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
          <Button className="mt-2">Load existing character</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col h-2/3">
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
                >
                  Name: {char.name} - id: {char.id}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <Button
              className="w-full"
              onClick={() => {
                id && loadCharacterExecute({ id });
              }}
            >
              Confirm Selection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
