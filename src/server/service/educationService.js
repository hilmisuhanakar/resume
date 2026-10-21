import "server-only";
import { createEducationRepository, updateEducationRepository, deleteEducationRepository, getEducationByIdRepository, getEducationsRepository, getEducationsByLanguageIdRepository } from "../repository/educationRepository";
import { cacheLife, cacheTag } from "next/cache";

export const createEducationService = async (data) => {
    const education = await createEducationRepository(data);
    return education;
}

export const updateEducationService = async (data) => {
    const education = await updateEducationRepository(data);
    return education;
}

export const deleteEducationService = async (id) => {
    const education = await deleteEducationRepository(id);
    return education;
}

export const getEducationByIdService = async (id) => {
    const education = await getEducationByIdRepository(id);
    return education;
}

export const getEducationsService = async () => {
    const educations = await getEducationsRepository();
    return educations;
}

export const getEducationsByLanguageIdService = async (locale) => {
    "use cache";
    cacheTag(`education`);
    cacheLife("max");
    const educations = await getEducationsByLanguageIdRepository(locale);
    return educations;
}