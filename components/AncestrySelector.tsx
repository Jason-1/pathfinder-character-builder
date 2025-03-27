"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAncestry } from "@/app/Slices/ancestrySlice";
import { setHeritage } from "@/app/Slices/heritageSlice";

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

import { Ancestries } from "@/data";
import { heritiges } from "@/data/heritiges";
import { Button } from "./ui/button";

const AncestrySelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedAncestry = useSelector((state: any) => state.ancestry.ancestry);
  const selectedHeritage = useSelector((state: any) => state.heritage.heritage);

  const handleSetAncestry = (ancestry: string) => {
    dispatch(setAncestry({ ancestry }));
  };

  const handleSetHeritage = (heritage: string) => {
    dispatch(setHeritage({ heritage }));
  };

  const availableHeritiges = heritiges.filter(
    (heritigeItem) => heritigeItem.ancestryName === selectedAncestry
  );

  return (
    <div className="mt-6 flex flex-col">
      <Dialog>
        <DialogTrigger>
          {selectedAncestry === "Select Ancestry" ? "" : "Ancestry: "}
          {selectedAncestry}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select an Ancestry</DialogTitle>
            <Accordion type="single" collapsible>
              {Ancestries.map((ancestryItem) => (
                <AccordionItem
                  value={ancestryItem.name}
                  key={ancestryItem.name}
                >
                  <AccordionTrigger>{ancestryItem.name}</AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardHeader>
                        <CardDescription>
                          {ancestryItem.Attributes}
                        </CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                      <CardFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              handleSetAncestry(ancestryItem.name);
                              handleSetHeritage("Select Heritage");
                            }}
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

      <Dialog>
        <DialogTrigger>
          {selectedHeritage === "Select Heritage" ? "" : "Heritage: "}
          {selectedHeritage}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Heritage</DialogTitle>
            <Accordion type="single" collapsible>
              {availableHeritiges.map((heritigeItem) => (
                <AccordionItem
                  value={heritigeItem.heritageName}
                  key={heritigeItem.heritageName}
                >
                  <AccordionTrigger>
                    {heritigeItem.heritageName}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardHeader>
                        <CardDescription>{heritigeItem.desc}</CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                      <CardFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() =>
                              handleSetHeritage(heritigeItem.heritageName)
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

export default AncestrySelector;
