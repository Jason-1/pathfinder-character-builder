import React from "react";
import { Button } from "./ui/button";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useSelector } from "react-redux";

import { updateCharacter } from "@/server/actions/update-character";
import { useRouter } from "next/navigation";
import { deleteCharacter } from "@/server/actions/delete-character";
import {
  selectAncestry,
  selectArmour,
  selectAttributeBoostCategories,
  selectBackground,
  selectClass,
  selectHeritage,
  selectID,
  selectLevel,
  selectName,
  selectSubclass,
} from "@/app/redux/selectors";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const DatabaseButtons = () => {
  const router = useRouter();

  const name = useSelector(selectName) || "";
  const id = useSelector(selectID);
  const level = useSelector(selectLevel);
  const selectedAncestry = useSelector(selectAncestry);
  const selectedHeritage = useSelector(selectHeritage);
  const selectedBackground = useSelector(selectBackground);
  const selectedClass = useSelector(selectClass);
  const selectedSubclass = useSelector(selectSubclass);
  const selectedArmour = useSelector(selectArmour);
  const attributeBoosts = useSelector(selectAttributeBoostCategories);

  const { execute: updateCharacterExecute } = useAction(updateCharacter, {
    onSuccess: (data) => {
      if (data.data) {
        toast.success(`Character "${data.data.name}" updated successfully!`);
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

  const subclassValue =
    selectedSubclass.name !== "Select a subclass"
      ? selectedSubclass.name
      : null;

  const heritageValue =
    selectedHeritage.name !== "Select Heritage" ? selectedHeritage.name : null;

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
        <Button
          onClick={() =>
            id &&
            updateCharacterExecute({
              id,
              name,
              level,
              ancestryName: selectedAncestry.name,
              heritageName: heritageValue,
              backgroundName: selectedBackground.name,
              className: selectedClass.name,
              subclassName: subclassValue,
              attributesTable: attributeBoosts,
              armourName: selectedArmour.name,
            })
          }
        >
          Save Character
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <span className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Delete Character
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete: {name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-row gap-4 items-center justify-center w-full">
              <Button
                variant={"destructive"}
                className="w-full"
                onClick={() => id && deleteCharacterExecute({ id })}
              >
                Yes
              </Button>
              <DialogClose asChild>
                <span className="cursor-pointer w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                  No
                </span>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Return to Homepage
        </Button>
      </div>
      <span>ID: {id}</span>
    </div>
  );
};

export default DatabaseButtons;
