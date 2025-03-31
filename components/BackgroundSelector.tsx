"use client";

import React from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { setBackground } from "@/app/Slices/backgroundSlice";

const BackgroundSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedBackground = useSelector(
    (state: { background: { background: string } }) =>
      state.background.background
  );

  const handleSetBackground = (background: string) => {
    dispatch(setBackground({ background }));
  };

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
                              handleSetBackground(backgroundItem.name)
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
