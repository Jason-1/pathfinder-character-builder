CREATE TYPE "public"."size" AS ENUM('Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan');--> statement-breakpoint
CREATE TABLE "ancestries" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"attributes" "attributes"[] DEFAULT '{}' NOT NULL,
	"hp" integer DEFAULT 6 NOT NULL,
	"speed" integer DEFAULT 25 NOT NULL,
	"size" "size" DEFAULT 'Medium' NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "heritages" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"ancestry_name" varchar(255) NOT NULL,
	"ability_name" varchar(255),
	"description" text DEFAULT 'No description available'
);
--> statement-breakpoint
ALTER TABLE "heritages" ADD CONSTRAINT "heritages_ancestry_name_ancestries_name_fk" FOREIGN KEY ("ancestry_name") REFERENCES "public"."ancestries"("name") ON DELETE no action ON UPDATE no action;