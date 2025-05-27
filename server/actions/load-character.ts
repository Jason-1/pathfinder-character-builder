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
    const result = await db
      .select()
      .from(characters)
      .where(eq(characters.id, id));
    return { data: result[0] };
  });
