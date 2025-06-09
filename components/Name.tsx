"use client";

import React from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "@/app/redux/Slices/nameSlice";
import { selectName, selectWeapon } from "@/app/redux/selectors";
import DOMPurify from "dompurify";

const Name = () => {
  const dispatch = useDispatch();

  const name = useSelector(selectName) || "";

  //------------------------------------------------------------------------------//

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitisedInput = DOMPurify.sanitize(event.target.value);
    dispatch(setName(sanitisedInput));
  };

  return (
    <div className="flex justify-center h-[42px]">
      <Input
        className="inline-block w-full max-w-[300px] h-auto"
        value={name}
        onChange={handleInputChange}
        placeholder="Enter your characters name"
      />
    </div>
  );
};

export default Name;
