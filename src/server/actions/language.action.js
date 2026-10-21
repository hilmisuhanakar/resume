"use server"

import { getLanguagesServices } from "../service/languageService";

export async function getLanguagesAction() {
    const languages = await getLanguagesServices();
    return languages;
}