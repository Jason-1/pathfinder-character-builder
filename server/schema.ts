import {
  pgTable,
  varchar,
  integer,
  serial,
  boolean,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  level: integer("level").notNull().default(1),
  armourName: varchar("armour_name", { length: 255 })
    .references(() => armour.name)
    .default("Unarmoured"),
});

export const ArmourCategoryEnum = pgEnum("category", [
  "unarmoured",
  "light",
  "medium",
  "heavy",
]);

export const armour = pgTable("armour", {
  name: varchar("name", { length: 255 }).unique().notNull().primaryKey(),
  category: ArmourCategoryEnum("category").notNull().default("unarmoured"),
  ACBonus: integer("AC_bonus").notNull().default(0),
  dexCap: integer("dex_cap").notNull().default(5),
  strength: integer("strength").notNull().default(0),
  checkPenalty: integer("check_penalty").notNull().default(0),
  speedPenalty: integer("speed_penalty").notNull().default(0),
  bulk: varchar("bulk", { length: 255 }).notNull().default("0"),
  group: varchar("group", { length: 255 }).notNull().default(""),
  description: text("description").notNull().default("No Armour"),
});

export const CharacterRelations = relations(characters, ({ one }) => ({
  armour: one(armour, {
    fields: [characters.armourName],
    references: [armour.name],
  }),
}));

export const ArmourRelations = relations(armour, ({ many }) => ({
  characters: many(characters),
}));

export const TrainingEnum = pgEnum("training", [
  "Untrained",
  "Trained",
  "Expert",
  "Master",
  "Legendary",
]);

export const AttributesEnum = pgEnum("attributes", [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
  "Free",
]);

export const classes = pgTable("classes", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  type: varchar("type", { length: 255 }).notNull(),
  tradition: varchar("tradition", { length: 255 }).default(""),
  perception: TrainingEnum("perception").notNull().default("Untrained"),
  specialisation: integer("specialisation").array().notNull().default([]),
  DC: TrainingEnum("DC").notNull().default("Untrained"),
  hp: integer("hp").notNull().default(0),
  attributes: AttributesEnum("attributes").array().notNull().default([]),
  description: text("description")
    .notNull()
    .default("No description available"),
});

/*
export type ClassType = {
  name: string;
  type: string;
  tradition?: string;
  perception: TrainingType;
  specialisation: number[];
  DC: TrainingType;
  hp: number;
  Attributes: AttributesType[];
  description: string;
};



  saves: {
    fortitude: number[];
    reflex: number[];
    will: number[];
  };

skills: {
    Acrobatics?: TrainingType;
    Arcana?: TrainingType;
    Athletics?: TrainingType;
    Crafting?: TrainingType;
    Deception?: TrainingType;
    Diplomacy?: TrainingType;
    Intimidation?: TrainingType;
    Medicine?: TrainingType;
    Nature?: TrainingType;
    Occultism?: TrainingType;
    Performance?: TrainingType;
    Religion?: TrainingType;
    Society?: TrainingType;
    Stealth?: TrainingType;
    Survival?: TrainingType;
    Thievery?: TrainingType;
    additional: number;
  };

   attacks: {
    simple: number[];
    martial: number[];
    advanced: number[];
    unarmed: number[];
  };

  defences: {
    unarmoured: number[];
    light: number[];
    medium: number[];
    heavy: number[];
  };

 features: {
    name: string;
    level: number;
    description: string;
  }[];

spells: spellObjectType[];


*/
