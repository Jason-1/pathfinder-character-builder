"use server";

import { db } from "../index";
import { characters, attributes } from "../schema";
import { createCharacterSchema } from "@/types/create-character-schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const createCharacter = action
  .schema(createCharacterSchema)
  .action(async (input) => {
    const { name } = input.parsedInput;

    try {
      const result = await db.insert(characters).values({ name }).returning();
      const newChar = result[0];

      const boostTypes = [
        "Ancestry",
        "Background",
        "Class",
        "Initial",
        "Level5",
        "Level10",
        "Level15",
        "Level20",
      ] as const;
      await db.insert(attributes).values(
        boostTypes.map((type) => ({
          characterID: newChar.id,
          name: type,
          boosts: [],
        }))
      );

      return newChar;
    } catch (error) {
      console.error("Error creating character:", error);
      throw new Error("Failed to create character");
    }
  });
