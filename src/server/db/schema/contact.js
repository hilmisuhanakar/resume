import { encryptedText } from "../types/encryptedText";
import { languages } from "./languages";
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
export const contact = pgTable("contact", {
    id: serial("id").primaryKey(),
    languageId: integer("language_id").references(() => languages.id).notNull(),
    name: encryptedText("name").notNull(),
    email: encryptedText("email").notNull(),
    message: encryptedText("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});