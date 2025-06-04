CREATE TYPE "public"."category" AS ENUM('unarmoured', 'light', 'medium', 'heavy');--> statement-breakpoint
ALTER TABLE "armour" ALTER COLUMN "category" SET DEFAULT 'unarmoured'::"public"."category";--> statement-breakpoint
ALTER TABLE "armour" ALTER COLUMN "category" SET DATA TYPE "public"."category" USING "category"::"public"."category";