"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../index";
import { characters, attributes } from "../schema";
import { updateCharacterSchema } from "@/types/update-character-schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const updateCharacter = action
  .schema(updateCharacterSchema)
  .action(async (input) => {
    const {
      id,
      name,
      level,
      ancestryName,
      heritageName,
      backgroundName,
      className,
      subclassName,
      attributesTable,
      armourName,
    } = input.parsedInput;

    try {
      const result = await db
        .update(characters)
        .set({
          name,
          level,
          ancestryName,
          heritageName,
          backgroundName,
          className,
          subclassName,
          armourName,
        })
        .where(eq(characters.id, id))
        .returning();

      if (attributesTable && attributesTable.length > 0) {
        for (const attributeBoost of attributesTable) {
          await db
            .update(attributes)
            .set({
              boosts: attributeBoost.boosts,
            })
            .where(
              and(
                eq(attributes.characterID, id),
                eq(attributes.name, attributeBoost.name)
              )
            );
        }
      }

      return result[0];
    } catch (error) {
      console.error("Error creating character:", error);
      throw new Error("Failed to update character");
    }
  });
