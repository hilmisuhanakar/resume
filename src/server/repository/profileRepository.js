import "server-only";

import { db } from "../db";
import { profile } from "../db/schema/profile";
import { asc, count, eq, sql } from "drizzle-orm";
import { languages } from "../db/schema/languages";

export async function getProfileRepository(pageIndex, pageSize, sorting) {
    const data = await db
        .select({
            id: profile.id,
            languageName: languages.name,
            updatedAt: profile.updatedAt,
            languageId: profile.languageId,
        })
        .from(profile)
        .innerJoin(
            languages,
            eq(profile.languageId, languages.id)
        )
        .limit(pageSize)
        .offset(pageIndex * pageSize)
        .orderBy(asc(profile.languageId));

    const [{ count: totalCount }] = await db
        .select({
            count: count(),
        })
        .from(profile);

    return {
        data,
        pageIndex,
        pageSize,
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
    };
}

export async function getProfileByIdRepository(id) {
    const result = await db.select().from(profile).where(eq(profile.id, id)).limit(1);
    const data = result[0];
    return data;
}

export async function createProfileRepository(data) {
    return await db.insert(profile).values(data);
}

export async function updateProfileRepository(data) {
    const { id, ...rest } = data;
    rest["updatedAt"] = new Date();
    return await db.update(profile).set(rest).where(eq(profile.id, data.id));
}

export async function deleteProfileRepository(id) {
    return await db.delete(profile).where(eq(profile.id, id));
}

export async function getMeInfoRepository(locale) {
    const result = await db.select({
        name: profile.name,
        title: profile.title,
        about: profile.about,
        email: profile.email,
        linkedin: profile.linkedin,
        github: profile.github,
    }).from(profile).innerJoin(languages, eq(profile.languageId, languages.id)).where(eq(languages.code, locale.toUpperCase()));
    return result[0];
}