"use server";

import { db } from "../index";
import { attributes } from "../schema";
import { createSafeActionClient } from "next-safe-action";
import { eq } from "drizzle-orm";
import { loadAttributesSchema } from "@/types/load-attributes-schema";

const action = createSafeActionClient();

export const loadAttributes = action
  .schema(loadAttributesSchema)
  .action(async (input) => {
    const { characterId } = input.parsedInput;

    try {
      const result = await db
        .select()
        .from(attributes)
        .where(eq(attributes.characterID, characterId))
        .orderBy(attributes.name);
      return result;
    } catch (error) {
      console.error("Error loading attributes:", error);
      throw new Error("Failed to load attributes");
    }
  });
