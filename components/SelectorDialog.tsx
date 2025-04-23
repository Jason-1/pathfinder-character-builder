import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
  T extends { name: string; description: string; level?: number }
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
  // Tabs example for when they are implemented
  const getLevelTabs = () => {
    const levels: number[] = [];

    for (let i = 0; i < data.length; i++) {
      const level = data[i].level;
      if (level !== undefined) {
        if (!levels.includes(level)) {
          levels.push(level);
        }
      }
    }
    return levels;
  };

  return (
    <Dialog
      onOpenChange={() => {
        setHighlightedItem(
          data.find((item) => item.name === selectedItem) || data[0] || {}
        );
      }}
    >
      <DialogTrigger>{selectedItem}</DialogTrigger>
      <DialogContent className="w-3/4 max-w-4xl h-3/4 max-h-[75vh] flex flex-col">
        <DialogHeader className="flex-grow">
          <DialogTitle className="grid grid-cols-3 text-center items-start">
            <span className="col-span-1 self-start">Select {itemType}</span>
            <span className="col-span-2 self-start">
              {highlightedItemName || ""}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-10 items-start justify-between flex-grow overflow-y-auto h-full">
          <div className="border rounded-sm p-2 self-start h-full overflow-y-auto ">
            {data.map((item) => (
              <div
                key={item.name}
                className={`flex flex-row gap-2 mt-0 cursor-pointer col-span-1 justify-between items-center ${
                  highlightedItemName === item.name ? "bg-gray-400" : ""
                }`}
                onClick={() => {
                  setHighlightedItem(item);
                }}
              >
                <span>{item.name}</span>
                {item.level && (
                  <span className="border px-2 rounded-md h-5 w-5 text-sm flex items-center justify-center border-blue-800 bg-blue-800">
                    {`${item.level}`}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="col-span-2 self-start">
            {children}
            <p className="mt-4">{highlightedItemDescription || ""}</p>
          </div>
        </div>
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
