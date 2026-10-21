import { pgTable, serial, text, timestamp, } from "drizzle-orm/pg-core";
export const languages = pgTable("languages", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    code: text("code").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});