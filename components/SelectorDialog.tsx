import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SelectorDialogProps<T> {
  itemType: string;
  selectedItem: string;
  data: T[];
  onItemClick: (item: T) => void;
}

const SelectorDialog = <T extends { name: string }>({
  itemType,
  selectedItem,
  data,
  onItemClick,
}: SelectorDialogProps<T>) => {
  return (
    <Dialog>
      <DialogTrigger>{selectedItem}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select {itemType}</DialogTitle>
          {data.map((item) => (
            <div
              key={item.name}
              className="flex flex-row gap-2 cursor-pointer"
              onClick={() => {
                onItemClick(item);
              }}
            >
              {item.name}
            </div>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SelectorDialog;
