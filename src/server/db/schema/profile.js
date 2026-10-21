import { encryptedText } from "../types/encryptedText";
import { pgTable, text, timestamp, serial, integer } from "drizzle-orm/pg-core";
import { languages } from "./languages";

export const profile = pgTable("profile", {
    id: serial("id").primaryKey(),
    languageId: integer("language_id").references(() => languages.id).notNull(),
    name: encryptedText("name").notNull(),
    title: encryptedText("title").notNull().default("-"),
    email: encryptedText("email").notNull(),
    about: text("about").notNull(),
    linkedin: encryptedText("linkedin"),
    github: encryptedText("github"),
    twitter: encryptedText("twitter"),
    facebook: encryptedText("facebook"),
    instagram: encryptedText("instagram"),
    youtube: encryptedText("youtube"),
    tiktok: encryptedText("tiktok"),
    pinterest: encryptedText("pinterest"),
    reddit: encryptedText("reddit"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});