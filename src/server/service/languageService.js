import "server-only";
import { getLanguagesRepository } from "../repository/languageRepository";

export async function getLanguagesServices() {
    return await getLanguagesRepository();
}