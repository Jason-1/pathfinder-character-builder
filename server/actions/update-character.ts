"use server";

import { eq } from "drizzle-orm";
import { db } from "../index";
import { characters } from "../schema";
import { updateCharacterSchema } from "@/types/update-character-schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const updateCharacter = action
  .schema(updateCharacterSchema)
  .action(async (input) => {
    const { id, name } = input.parsedInput;

    try {
      const result = await db
        .update(characters)
        .set({ name })
        .where(eq(characters.id, id))
        .returning();

      return result[0];
    } catch (error) {
      console.error("Error creating character:", error);
      throw new Error("Failed to update character");
    }
  });
