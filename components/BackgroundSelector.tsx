"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
      <Dialog>
        <DialogTrigger>
          {selectedBackground === "Select Background" ? "" : "Background: "}
          {selectedBackground}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Background</DialogTitle>
            <Accordion type="single" collapsible>
              {Backgrounds.map((backgroundItem) => (
                <AccordionItem
                  value={backgroundItem.name}
                  key={backgroundItem.name}
                >
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
              ))}
            </Accordion>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BackgroundSelector;
