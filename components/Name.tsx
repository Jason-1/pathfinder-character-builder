"use client";

import React from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "@/app/redux/Slices/nameSlice";
import { selectName } from "@/app/redux/selectors";
import { Button } from "./ui/button";
import { useAction } from "next-safe-action/hooks";
import { createCharacter } from "@/server/actions/create-character";
import { toast } from "sonner";
import { loadCharacter } from "@/server/actions/load-character";

const Name = () => {
  const dispatch = useDispatch();

  const name = useSelector(selectName) || "";

  //------------------------------------------------------------------------------//

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

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
    <div className="flex justify-center h-[42px]">
      <Input
        className="inline-block w-full max-w-[300px] h-auto"
        value={name}
        onChange={handleInputChange}
        placeholder="Enter your characters name"
      />
      <Button onClick={() => execute({ name })}>Save Character</Button>
      <Button onClick={() => loadCharacterExecute({ id: 26 })}>
        Load Character
      </Button>
    </div>
  );
};

export default Name;
