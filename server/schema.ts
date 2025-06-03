import {
  pgTable,
  varchar,
  integer,
  serial,
  boolean,
  text,
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

export const armour = pgTable("armour", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  category: varchar("category", { length: 255 }).notNull(),
  ACBonus: integer("AC_bonus").notNull().default(0),
  dexCap: integer("dex_cap").notNull().default(5),
  strength: integer("strength").notNull().default(0),
  checkPenalty: integer("check_penalty").notNull().default(0),
  speedPenalty: integer("speed_penalty").notNull().default(0),
  bulk: varchar("bulk", { length: 255 }).notNull().default("0"),
  group: varchar("group", { length: 255 }).notNull().default(""),
  description: text("description").notNull().default("No Armour"),
});
