CREATE TYPE "public"."attribute_boosts" AS ENUM('Ancestry', 'Background', 'Class', 'Initial', 'Level5', 'Level10', 'Level15', 'Level20');--> statement-breakpoint
CREATE TABLE "attributes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "attribute_boosts" NOT NULL,
	"character_id" integer,
	"boosts" "attributes"[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;