ALTER TABLE "characters" ALTER COLUMN "armour_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "class_name" varchar(255) DEFAULT 'Fighter' NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_class_name_classes_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("name") ON DELETE no action ON UPDATE no action;