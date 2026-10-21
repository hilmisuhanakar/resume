import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "../db";
import { skills } from "../db/schema/skills";

export const createSkillRepository = async (value) => {
    const {id, ...rest} = value;
    const result = await db.insert(skills).values(rest);
    return result[0];
}

export const updateSkillRepository = async (value) => {
    const {id, ...rest} = value;
    const result = await db.update(skills).set(rest).where(eq(skills.id, id));
    return result[0];
}

export const getSkillsRepository = async () => {
    const result = await db.select().from(skills).orderBy(asc(skills.orderNumber));
    return result;
}

export const getSkillByIdRepository = async (id) => {
    const result = await db.select().from(skills).where(eq(skills.id, id));
    return result[0];
}