"use server";

import { loadCharacterSchema } from "@/types/load-character-schema";
import { db } from "../index";
import { attributes, characters } from "../schema";
import { createSafeActionClient } from "next-safe-action";
import { eq } from "drizzle-orm";

const action = createSafeActionClient();

export const deleteCharacter = action
  .schema(loadCharacterSchema)
  .action(async (input) => {
    const { id } = input.parsedInput;

    try {
      await db.delete(attributes).where(eq(attributes.characterID, id));

      const result = await db
        .delete(characters)
        .where(eq(characters.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error("Error deleting character:", error);
      throw new Error("Failed to delete character");
    }
  });
