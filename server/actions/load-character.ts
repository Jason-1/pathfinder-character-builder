"use server";

import { loadCharacterSchema } from "@/types/load-character-schema";
import { db } from "../index";
import { characters } from "../schema";
import { createSafeActionClient } from "next-safe-action";
import { eq } from "drizzle-orm";

const action = createSafeActionClient();

export const loadCharacter = action
  .schema(loadCharacterSchema)
  .action(async (input) => {
    const { id } = input.parsedInput;

    try {
      const result = await db
        .select()
        .from(characters)
        .where(eq(characters.id, id));
      return result[0];
    } catch (error) {
      console.error("Error loading character:", error);
      throw new Error("Failed to load character");
    }
  });
