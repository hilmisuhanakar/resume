import "server-only";
import { db } from "@/server/db";
import { contact } from "../db/schema/contact";
import { languages } from "../db/schema/languages";
import { desc, eq } from "drizzle-orm";

export const createContactRepository = async (data) => {
    const language = await db.select().from(languages).where(eq(languages.code, data.locale.toUpperCase()));
    const _languageId = language[0].id;
    data["languageId"] = _languageId;
    const result = await db.insert(contact).values(data);
    return result[0];
};

export const getContactsRepository = async () => {
    const result = await db
        .select({
            id: contact.id,
            name: contact.name,
            email: contact.email,
            languageName: languages.name,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        })
        .from(contact)
        .innerJoin(languages, eq(contact.languageId, languages.id)).orderBy(desc(contact.createdAt));

    return result;
};

export const getContactByIdRepository = async (id) => {
    const result = await db.select({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        createdAt: contact.createdAt,
    }).from(contact).where(eq(contact.id, id)).innerJoin(languages, eq(contact.languageId, languages.id));
    return result[0];
};