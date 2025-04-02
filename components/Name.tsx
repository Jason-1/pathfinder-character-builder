import React from "react";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "@/app/Slices/nameSlice";

const Name = () => {
  const dispatch = useDispatch();

  const name =
    useSelector((state: { name: { name: string } }) => state.name.name) || "";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value)); // Dispatch the action to update the name
  };
  return (
    <div className="flex justify-center">
      <Input
        value={name}
        onChange={handleInputChange}
        placeholder="Enter your characters name"
      />
    </div>
  );
};

export default Name;
