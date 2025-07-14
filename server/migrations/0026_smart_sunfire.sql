CREATE TABLE "skill_proficiencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" integer NOT NULL,
	"skill" "skill" NOT NULL,
	"attribute" "attributes" NOT NULL,
	"levels_boosted" integer[] DEFAULT '{}' NOT NULL,
	"int_boost" integer
);
--> statement-breakpoint
ALTER TABLE "skill_proficiencies" ADD CONSTRAINT "skill_proficiencies_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;