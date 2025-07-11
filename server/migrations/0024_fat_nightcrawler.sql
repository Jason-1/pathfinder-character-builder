CREATE TYPE "public"."attribute_boost_names" AS ENUM('Ancestry', 'Background', 'Class', 'Initial', 'Level5', 'Level10', 'Level15', 'Level20');--> statement-breakpoint
CREATE TABLE "attribute_boosts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "attribute_boost_names" NOT NULL,
	"character_id" integer,
	"boosts" "attributes"[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attribute_boosts" ADD CONSTRAINT "attribute_boosts_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;