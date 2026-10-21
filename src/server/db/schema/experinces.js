import { languages } from "./languages";
import { pgTable, serial, text, timestamp, integer, date } from "drizzle-orm/pg-core";

export const experinces = pgTable("experinces", {
    id: serial("id").primaryKey(),
    languageId: integer("language_id").references(() => languages.id).notNull(),
    company: text("company").notNull(),
    position: text("position").notNull(),
    description: text("description").notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});