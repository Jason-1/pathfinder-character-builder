CREATE TABLE "subclasses" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(255),
	"name" varchar(255) NOT NULL,
	"description" text DEFAULT 'No description available' NOT NULL,
	CONSTRAINT "subclasses_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "subclass_name" varchar(255) DEFAULT 'None' NOT NULL;--> statement-breakpoint
ALTER TABLE "subclasses" ADD CONSTRAINT "subclasses_class_name_classes_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_subclass_name_subclasses_name_fk" FOREIGN KEY ("subclass_name") REFERENCES "public"."subclasses"("name") ON DELETE no action ON UPDATE no action;