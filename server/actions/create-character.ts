"use server";

import { db } from "../index";
import { characters } from "../schema";
import { createCharacterSchema } from "@/types/create-character-schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const createCharacter = action
  .schema(createCharacterSchema)
  .action(async (input) => {
    const { name } = input.parsedInput;

    try {
      const result = await db.insert(characters).values({ name }).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating character:", error);
      throw new Error("Failed to create character");
    }
  });
