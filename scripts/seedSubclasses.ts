import { subclasses } from "@/data";
import { db } from "../server/index";
import { subclasses as Subclasses } from "../server/schema";

async function seedSubclasses() {
  await db.delete(Subclasses);

  try {
    await db.insert(Subclasses).values(subclasses).onConflictDoNothing();
    console.log("Subclass data seeded successfully.");
  } catch (error) {
    console.error("Error seeding subclass data:", error);
  }
}

seedSubclasses();
