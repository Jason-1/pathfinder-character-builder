"use client";

import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Backgrounds } from "@/data";
import { Button } from "./ui/button";

interface BackgroundSelectorProps {
  selectedBackground: string;
  setSelectedBackground: React.Dispatch<React.SetStateAction<string>>;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  selectedBackground,
  setSelectedBackground,
}) => {
  return (
    <div className="mt-6 flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {selectedBackground === "Select Background" ? "" : "Background: "}
          {selectedBackground}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Backgrounds.map((backgroundItem) => (
            <DropdownMenuItem
              key={backgroundItem.name}
              onClick={() => setSelectedBackground(`${backgroundItem.name}`)}
            >
              {backgroundItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog>
        <DialogTrigger>
          {selectedBackground === "Select Background" ? "" : "Background: "}
          {selectedBackground}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Background</DialogTitle>
            {Backgrounds.map((backgroundItem) => (
              <Accordion type="single" collapsible key={backgroundItem.name}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{backgroundItem.name}</AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardHeader>
                        <CardDescription>
                          {backgroundItem.Attributes}
                        </CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                      <CardFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() =>
                              setSelectedBackground(backgroundItem.name)
                            }
                          >
                            Confirm Selection
                          </Button>
                        </DialogClose>
                      </CardFooter>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BackgroundSelector;
