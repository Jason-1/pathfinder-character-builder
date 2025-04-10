import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface SelectorDialogProps<T> {
  itemType: string;
  selectedItem: string;
  data: T[];
  highlightedItemName: string;
  highlightedItemDescription?: string;
  onItemClick: (item: string) => void;
  setHighlightedItem: (item: T) => void;
  children?: React.ReactNode;
}

const SelectorDialog = <
  T extends { name: string; description: string; [key: string]: any }
>({
  itemType,
  selectedItem,
  data,
  highlightedItemName,
  highlightedItemDescription,
  onItemClick,
  setHighlightedItem,
  children,
}: SelectorDialogProps<T>) => {
  //const [highlightedItem, setHighlightedItem] = React.useState<T | null>(null);

  return (
    <Dialog>
      <DialogTrigger>{selectedItem}</DialogTrigger>
      <DialogContent className="w-3/4 max-w-4xl h-3/4">
        <DialogHeader className="">
          <DialogTitle className="grid grid-cols-3 text-center items-start">
            <span className="col-span-1 self-start">Select {itemType}</span>
            <span className="col-span-2 self-start">
              {highlightedItemName || ""}
            </span>
          </DialogTitle>

          <div className="grid grid-cols-3 gap-10 items-start justify-between h-96">
            <div className="border rounded-sm p-2 self-start h-full">
              {data.map((item) => (
                <div
                  key={item.name}
                  className={`flex flex-row gap-2 mt-0 cursor-pointer col-span-1 ${
                    highlightedItemName === item.name ? "bg-gray-400" : ""
                  }`}
                  onClick={() => {
                    setHighlightedItem(item);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="col-span-2 self-start">
              {children}
              <p className="mt-4">{highlightedItemDescription || ""}</p>
            </div>
          </div>
        </DialogHeader>
        <DialogClose asChild className="w-1/3">
          <Button
            className="mt-auto"
            variant="default"
            onClick={() => {
              onItemClick(highlightedItemName);
            }}
          >
            Select {itemType}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SelectorDialog;

/*highlightedItem ? (
                <div>
                  {itemType === "Ancestry" && (
                    <div className="mt-4 flex flex-row gap-2 text-xs justify-center">
                      <p>speed: {highlightedItem.speed}</p>
                      <p>Attributes: {highlightedItem.Attributes.join(", ")}</p>
                      <p>hp: {highlightedItem.hp}</p>
                      <p>size: {highlightedItem.size}</p>
                    </div>
                  )}
                  {itemType === "Background" && (
                    <div className="mt-4 flex flex-row gap-2 text-xs justify-center">
                      <p>Attributes: {highlightedItem.Attributes.join(", ")}</p>
                      <p>Skills: {highlightedItem.skills.join(", ")}</p>
                    </div>
                  )}

                  {itemType === "Class" && (
                    <div className="mt-4 flex flex-row gap-2 text-xs justify-center">
                      <p>Attributes: {highlightedItem.Attributes.join(", ")}</p>
                      <p>hp: {highlightedItem.hp}</p>
                      <p>
                        Fortitude:{" "}
                        {trainingLevel(
                          highlightedItem.saves.fortitude.filter(
                            (value: number) => value === 1
                          ).length
                        )}{" "}
                      </p>
                      <p>
                        Reflex:{" "}
                        {trainingLevel(
                          highlightedItem.saves.reflex.filter(
                            (value: number) => value === 1
                          ).length
                        )}{" "}
                      </p>
                      <p>
                        Will:{" "}
                        {trainingLevel(
                          highlightedItem.saves.will.filter(
                            (value: number) => value === 1
                          ).length
                        )}
                      </p>
                    </div>
                  )}

                  {itemType === "Armour" && (
                    <div className="mt-4 flex flex-row gap-2 text-xs text-center">
                      <p>Type: {highlightedItem.type}</p>
                      <p>AC Bonus: {highlightedItem.ACBonus}</p>
                      <p>Dex Cap: {highlightedItem.dexCap}</p>
                      <p>Strength: {highlightedItem.strength}</p>
                      <p>Check Penalty: {highlightedItem.checkPenalty}</p>
                      <p>Speed Penalty: {highlightedItem.speedPenalty}</p>
                      <p>Bulk: {highlightedItem.bulk}</p>
                      <p>Group: {highlightedItem.group || "None"}</p>
                    </div>
                  )}

                  {itemType === "Shield" && (
                    <div className="mt-4 flex flex-row gap-2 text-xs text-center">
                      <p>AC Bonus: {highlightedItem.ACBonus}</p>
                      <p>Hardness: {highlightedItem.Hardness}</p>
                      <p>Speed Penalty: {highlightedItem.speedPenalty}</p>
                      <p>Bulk: {highlightedItem.bulk}</p>
                      <p>
                        HP(BT): {highlightedItem.hp}({highlightedItem.bt})
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p>No item selected</p>
              )*/
