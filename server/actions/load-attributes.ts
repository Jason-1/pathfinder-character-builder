"use server";

import { loadAttributesSchema } from "@/types/load-attributes-schema";
import { db } from "../index";
import { attributes } from "../schema";
import { createSafeActionClient } from "next-safe-action";
import { eq } from "drizzle-orm";

const action = createSafeActionClient();

export const loadAttributes = action
  .schema(loadAttributesSchema)
  .action(async (input) => {
    const { character_id } = input.parsedInput;

    try {
      const result = await db
        .select()
        .from(attributes)
        .where(eq(attributes.characterID, character_id));
      return result;
    } catch (error) {
      console.error("Error loading attributes:", error);
      throw new Error("Failed to load attributes");
    }
  });
