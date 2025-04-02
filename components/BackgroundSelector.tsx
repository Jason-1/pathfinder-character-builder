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
import { resetAllSkillBoostsAtLevel } from "@/app/Slices/selectedSkillsSlice";

const BackgroundSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedBackground = useSelector(
    (state: { background: { background: string } }) =>
      state.background.background
  );

  const handleChangeBackground = (background: string) => {
    //When a Background is set also reset skill proficiencies for it
    dispatch(setBackground({ background }));
    dispatch(resetAllSkillBoostsAtLevel({ currentLevel: -1 }));
  };

  return (
    <div className="mt-6 flex justify-start">
      <Dialog>
        <DialogTrigger>
          <div className="inline-block border rounded-sm hover:border-red-700 p-2 ">
            {selectedBackground === "Select Background" ? "" : "Background: "}
            {selectedBackground}
          </div>
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
                              handleChangeBackground(backgroundItem.name)
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
