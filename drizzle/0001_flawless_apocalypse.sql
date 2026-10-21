ALTER TABLE "users" ADD COLUMN "email_lookup" varchar(64) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "email_unique" ON "users" USING btree ("email");