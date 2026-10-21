import "server-only";
import { db } from "../db";
import { education } from "../db/schema/education";
import { languages } from "../db/schema/languages";
import { eq, getTableColumns } from "drizzle-orm";

export const createEducationRepository = async (data) => {
    const result = await db.insert(education).values(data);
    return result[0];
}

export const updateEducationRepository = async (data) => {
    const { id, ...rest } = data;
    rest["updatedAt"] = new Date();
    const result = await db.update(education).set(rest).where(eq(education.id, id));
    return result[0];
}

export const deleteEducationRepository = async (id) => {
    await db.delete(education).where(eq(education.id, id));
    return true;
}

export const getEducationByIdRepository = async (id) => {
    const result = await db.select().from(education).where(eq(education.id, id));
    return result[0];
}

export const getEducationsRepository = async () => {
    const result = await db.select({...getTableColumns(education), languageName: languages.name}).from(education).innerJoin(languages, eq(education.languageId, languages.id));
    return result;
}

export const getEducationsByLanguageIdRepository = async (locale) => {
    const result = await db.select(
        {
            id: education.id,
            languageName: languages.name,
            startDate: education.startDate,
            endDate: education.endDate,
            degree: education.degree,
            school: education.school,
            description: education.description,
        }
    ).from(education).innerJoin(languages, eq(education.languageId, languages.id)).where(eq(languages.code, locale.toUpperCase()));
    return result;
}