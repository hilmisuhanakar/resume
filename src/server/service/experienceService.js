import "server-only"

import { createExperienceRepository, updateExperienceRepository, deleteExperienceRepository, getExperiencesRepository, getExperienceByIdRepository, getExperienceByLocaleRepository } from "../repository/experinceRepository";
import { cacheLife, cacheTag } from "next/cache";

export const createExperienceService = async (value) => {
    const result = await createExperienceRepository(value);
    return result;
}

export const updateExperienceService = async (value) => {
    const result = await updateExperienceRepository(value);
    return result;
}

export const deleteExperienceService = async (id) => {
    const result = await deleteExperienceRepository(id);
    return result;
}

export const getExperiencesService = async () => {
    return await getExperiencesRepository();
}

export const getExperienceByIdService = async (id) => {
    return await getExperienceByIdRepository(id);
}

export const getExperienceByLocaleService = async (locale) => {
    "use cache";
    cacheTag(`experience`);
    cacheLife("max");
    return await getExperienceByLocaleRepository(locale);
}