import 'server-only'

import { asc, desc, eq, getTableColumns } from "drizzle-orm";
import { db } from "../db";
import { experinces } from "../db/schema/experinces";
import { languages } from '../db/schema/languages';

export const createExperienceRepository = async (value) => {
    const result = await db.insert(experinces).values(value);
    return result[0];
}

export const updateExperienceRepository = async (value) => {
    const { id, ...rest } = value;
    rest["updatedAt"] = new Date();
    const result = await db.update(experinces).set(rest).where(eq(experinces.id, value.id));
    return result[0];
}

export const deleteExperienceRepository = async (id) => {
    return await db.delete(experinces).where(eq(experinces.id, id));
}

export const getExperiencesRepository = async () => {
    return await db.select({ ...getTableColumns(experinces), languageName: languages.name }).from(experinces).innerJoin(languages, eq(experinces.languageId, languages.id)).orderBy(desc(experinces.startDate), asc(experinces.languageId));
}

export const getExperienceByIdRepository = async (id) => {
    const result = await db.select().from(experinces).where(eq(experinces.id, id));
    const data = result[0];
    return data;
}

export async function getExperienceByLocaleRepository(locale) {
    const result = await db.select({
        id: experinces.id,
        languageId: experinces.languageId,
        company: experinces.company,
        position: experinces.position,
        description: experinces.description,
        startDate: experinces.startDate,
        endDate: experinces.endDate,
    }).from(experinces).innerJoin(languages, eq(experinces.languageId, languages.id)).where(eq(languages.code, locale.toUpperCase())).orderBy(desc(experinces.startDate));
    return result;
}