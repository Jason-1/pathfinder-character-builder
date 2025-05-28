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

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

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
        Create new Character
      </Button>
      <Button
        onClick={() => {
          loadCharacterExecute({ id: 21 });
        }}
      >
        Load existing Character
      </Button>
    </main>
  );
}
