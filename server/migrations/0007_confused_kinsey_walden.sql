CREATE TYPE "public"."attributes" AS ENUM('Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma', 'Free');--> statement-breakpoint
CREATE TYPE "public"."training" AS ENUM('Untrained', 'Trained', 'Expert', 'Master', 'Legendary');--> statement-breakpoint
CREATE TABLE "saves" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"type" varchar(255) NOT NULL,
	"tradition" varchar(255) DEFAULT '',
	"perception" "training" DEFAULT 'Untrained' NOT NULL,
	"specialisation" integer[] DEFAULT '{}' NOT NULL,
	"DC" "training" DEFAULT 'Untrained' NOT NULL,
	"hp" integer DEFAULT 0 NOT NULL,
	"attributes" "attributes"[] DEFAULT '{}' NOT NULL,
	"description" text DEFAULT 'No description available' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "saves" ADD CONSTRAINT "saves_class_name_classes_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("name") ON DELETE no action ON UPDATE no action;