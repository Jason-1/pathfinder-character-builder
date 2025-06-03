import { armourData } from "@/data";
import { db } from "../server/index";
import { armour } from "../server/schema";

async function seedArmour() {
  try {
    await db.insert(armour).values(armourData).onConflictDoNothing();
    console.log("Armour data seeded successfully.");
  } catch (error) {
    console.error("Error seeding armour data:", error);
  }
}

seedArmour();
