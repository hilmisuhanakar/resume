import { pgTable, serial, smallint, text, timestamp } from "drizzle-orm/pg-core";
export const skills = pgTable("skills", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    orderNumber: smallint("order_number"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});