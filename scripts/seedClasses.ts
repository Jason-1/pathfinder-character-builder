import { Classes } from "@/data";
import { db } from "../server/index";
import {
  attacks,
  classes,
  defences,
  features,
  saves,
  skills,
  spellSlots,
} from "../server/schema";

async function seedClasses() {
  try {
    // Clear existing data in the tables
    await db.delete(spellSlots);
    await db.delete(features);
    await db.delete(defences);
    await db.delete(attacks);
    await db.delete(skills);
    await db.delete(saves);
    await db.delete(classes);

    for (const classData of Classes) {
      // Insert into classes table
      await db.insert(classes).values({
        name: classData.name,
        type: classData.type,
        tradition: classData.tradition,
        perception: classData.perception,
        specialisation: classData.specialisation,
        DC: classData.DC,
        hp: classData.hp,
        attributes: classData.Attributes,
        description: classData.description,
      });

      // Insert into saves table
      await db.insert(saves).values({
        className: classData.name,
        fortitude: classData.saves.fortitude,
        reflex: classData.saves.reflex,
        will: classData.saves.will,
      });

      // Insert into skills table

      await db.insert(skills).values({
        className: classData.name,
        skillsArray: classData.skills.skillsArray,
        additional: classData.skills.additional,
      });

      // Insert into attacks table
      await db.insert(attacks).values({
        className: classData.name,
        simple: classData.attacks.simple,
        martial: classData.attacks.martial,
        advanced: classData.attacks.advanced,
        unarmed: classData.attacks.unarmed,
      });

      // Insert into defences table
      await db.insert(defences).values({
        className: classData.name,
        unarmoured: classData.defences.unarmoured,
        light: classData.defences.light,
        medium: classData.defences.medium,
        heavy: classData.defences.heavy,
      });

      // Insert into features table
      for (const feature of classData.features) {
        await db.insert(features).values({
          className: classData.name,
          name: feature.name,
          level: feature.level,
          description: feature.description,
        });
      }

      // Insert into spellSlots table
      for (const spellLevel of classData.spellSlots) {
        await db.insert(spellSlots).values({
          className: classData.name,
          level: spellLevel.level,
          cantrips: spellLevel.cantrips,
          spellSlots: spellLevel.spellSlots,
        });
      }
    }

    console.log("Class data seeded successfully.");
  } catch (error) {
    console.error("Error seeding class data:", error);
  }
}

seedClasses();
