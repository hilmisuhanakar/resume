import "server-only";
import { db } from "../db";
import {  languages } from "../db/schema/languages";

export async function getLanguagesRepository() {
    return await db.select().from(languages);
}