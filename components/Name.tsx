"use client";

import React from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "@/app/redux/Slices/nameSlice";
import { selectName } from "@/app/redux/selectors";
import { Button } from "./ui/button";

const createCharacter = async (name: string) => {
  const { createCharacter } = await import("@/server/actions/create-character");
  await createCharacter(name);
};

const Name = () => {
  const dispatch = useDispatch();

  const name = useSelector(selectName) || "";

  //------------------------------------------------------------------------------//

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  const handleCreateCharacter = async () => {
    if (name) {
      await createCharacter(name);
    }
  };

  return (
    <div className="flex justify-center h-[42px]">
      <Input
        className="inline-block w-full max-w-[300px] h-auto"
        value={name}
        onChange={handleInputChange}
        placeholder="Enter your characters name"
      />
      <Button onClick={handleCreateCharacter}>Save Character</Button>
    </div>
  );
};

export default Name;
