import { heritiges } from "@/data/heritiges";
import { db } from "../server/index";
import { heritages as Heritages } from "../server/schema";
import { ancestries as Ancestries } from "../server/schema";

async function seedHeritages() {
  try {
    await db.delete(Heritages);

    const ancestryRows = await db
      .select({ name: Ancestries.name })
      .from(Ancestries);
    const validAncestryNames = new Set(ancestryRows.map((row) => row.name));

    for (const heritageData of heritiges) {
      if (!validAncestryNames.has(heritageData.ancestryName)) {
        console.warn(
          `Skipping heritage "${heritageData.name}" because ancestry "${heritageData.ancestryName}" does not exist.`
        );
        continue;
      }

      await db.insert(Heritages).values({
        name: heritageData.name,
        ancestryName: heritageData.ancestryName,
        description: heritageData.description,
        abilityName: heritageData.ability?.abilityName,
      });
    }

    console.log("Heritage data seeded successfully.");
  } catch (error) {
    console.error("Error seeding heritage data:", error);
  }
}

seedHeritages();
