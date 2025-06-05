CREATE TABLE "spellSlots" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(255),
	"level" integer NOT NULL,
	"cantrips" integer DEFAULT 0 NOT NULL,
	"spell_slots" integer[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "spellSlots" ADD CONSTRAINT "spellSlots_class_name_classes_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("name") ON DELETE no action ON UPDATE no action;