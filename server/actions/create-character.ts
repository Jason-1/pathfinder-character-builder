"use server";

import { db } from "../index";
import { characters } from "../schema";

export async function createCharacter(name: string) {
  await db.insert(characters).values({ name });
}
