ALTER TABLE "attributes" RENAME TO "attribute_boosts";--> statement-breakpoint
ALTER TABLE "attribute_boosts" DROP CONSTRAINT "attributes_character_id_characters_id_fk";
--> statement-breakpoint
ALTER TABLE "attribute_boosts" ADD CONSTRAINT "attribute_boosts_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;