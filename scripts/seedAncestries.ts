import { Ancestries } from "@/data";
import { db } from "../server/index";
import { ancestries, characters, heritages } from "../server/schema";

async function seedSubclasses() {
  await db.delete(characters);
  await db.delete(heritages);
  await db.delete(ancestries);

  try {
    await db.insert(ancestries).values(Ancestries).onConflictDoNothing();
    console.log("Ancestry data seeded successfully.");
  } catch (error) {
    console.error("Error seeding ancestry data:", error);
  }
}

seedSubclasses();
