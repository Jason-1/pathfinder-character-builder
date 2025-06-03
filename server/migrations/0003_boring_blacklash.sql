CREATE TABLE "armour" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"category" varchar(255) NOT NULL,
	"AC_bonus" integer DEFAULT 0 NOT NULL,
	"dex_cap" integer DEFAULT 5 NOT NULL,
	"strength" integer DEFAULT 0 NOT NULL,
	"check_penalty" integer DEFAULT 0 NOT NULL,
	"speed_penalty" integer DEFAULT 0 NOT NULL,
	"bulk" integer DEFAULT 0 NOT NULL,
	"group" varchar(255) DEFAULT '' NOT NULL,
	"description" text DEFAULT 'No Armour' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "armour_name" varchar(255) DEFAULT 'Unarmoured';--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_armour_name_armour_name_fk" FOREIGN KEY ("armour_name") REFERENCES "public"."armour"("name") ON DELETE no action ON UPDATE no action;