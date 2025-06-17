import { Backgrounds } from "@/data";
import { db } from "../server/index";
import { background } from "../server/schema";

async function seedSubclasses() {
  await db.delete(background);

  try {
    await db.insert(background).values(Backgrounds).onConflictDoNothing();
    console.log("Background data seeded successfully.");
  } catch (error) {
    console.error("Error seeding background data:", error);
  }
}

seedSubclasses();
