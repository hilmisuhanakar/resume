import { pgTable, serial, text, timestamp, varchar, boolean, uniqueIndex } from "drizzle-orm/pg-core";

import { encryptedText } from "../types/encryptedText";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),

    name: encryptedText("name").notNull(),

    email: encryptedText("email").notNull(),

    image: text("image"),

    emailLookup: varchar("email_lookup", {
        length: 64
    }).notNull().unique(),

    passwordHash: varchar("password_hash", {
        length: 255
    }).notNull(),

    totp: encryptedText("totp", {
        length: 500
    }),

    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull()
}, (table) => [
    uniqueIndex("email_unique").on(table.email)
]);