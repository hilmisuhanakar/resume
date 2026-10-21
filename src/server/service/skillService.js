import "server-only";
import { createSkillRepository, getSkillByIdRepository, getSkillsRepository, updateSkillRepository } from "../repository/skillRepository";
import { cacheLife, cacheTag } from "next/cache";

export const createSkillService = async (value) => {
    const result = await createSkillRepository(value);
    return result;
}

export const getSkillsService = async () => {
    "use cache";
    cacheTag(`skills`);
    cacheLife("max");
    const result = await getSkillsRepository();
    return result;
}

export const updateSkillService = async (value) => {
    const result = await updateSkillRepository(value);
    return result;
}

export const getSkillByIdService = async (id) => {
    const result = await getSkillByIdRepository(id);
    return result;
}