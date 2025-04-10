import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface SelectorDialogProps<T> {
  itemType: string;
  selectedItem: string;
  data: T[];
  onItemClick: (item: T) => void;
}

const SelectorDialog = <
  T extends { name: string; description: string; [key: string]: any }
>({
  itemType,
  selectedItem,
  data,
  onItemClick,
}: SelectorDialogProps<T>) => {
  const [highlightedItem, setHighlightedItem] = React.useState<T | null>(null);

  return (
    <Dialog>
      <DialogTrigger>{selectedItem}</DialogTrigger>
      <DialogContent className="w-3/4 max-w-4xl">
        <DialogHeader>
          <DialogTitle className="grid grid-cols-3 text-center">
            <span className="col-span-1">Select {itemType}</span>{" "}
            <span className="col-span-2">{highlightedItem?.name || ""}</span>
          </DialogTitle>{" "}
        </DialogHeader>
        <div>
          <div className="grid grid-cols-3 gap-10 items-center justify-between h-96">
            <div className="border rounded-sm p-2 self-start h-full">
              {data.map((item) => (
                <div
                  key={item.name}
                  className={`flex flex-row gap-2 mt-0 cursor-pointer col-span-1 ${
                    highlightedItem?.name === item.name ? "bg-gray-400" : ""
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
              {highlightedItem ? (
                <div>
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
              )}
              <p className="mt-4">
                {highlightedItem
                  ? highlightedItem.description
                  : "No Description"}
              </p>
            </div>
          </div>
          <DialogClose asChild className="w-1/3">
            <Button
              className="mt-4"
              variant="default"
              onClick={() => {
                if (highlightedItem) {
                  onItemClick(highlightedItem);
                }
              }}
            >
              Select {itemType}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectorDialog;
