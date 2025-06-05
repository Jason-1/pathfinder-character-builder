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

export const ArnourCategoryEnum = pgEnum("category", [
  "unarmoured",
  "light",
  "medium",
  "heavy",
]);

export const armour = pgTable("armour", {
  name: varchar("name", { length: 255 }).unique().notNull().primaryKey(),
  category: ArnourCategoryEnum("category").notNull().default("unarmoured"),
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
