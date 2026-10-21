import "server-only";
import { getProfileRepository, getProfileByIdRepository, createProfileRepository, updateProfileRepository, deleteProfileRepository, getMeInfoRepository } from "../repository/profileRepository";
import { cacheLife, cacheTag } from "next/cache";

export async function getProfileServices(pageIndex = 0, pageSize = 10, sorting = []) {
    return await getProfileRepository(pageIndex, pageSize, sorting);
}

export async function getProfileByIdServices(id) {
    return await getProfileByIdRepository(id);
}

export async function createProfileServices(data) {
    const result = await createProfileRepository(data);
    return result;
}

export async function updateProfileServices(data) {
    const result = await updateProfileRepository(data);
    return result;
}

export async function deleteProfileServices(id) {
    const result = await deleteProfileRepository(id);
    return result;
}

export async function getMeInfoServices(locale) {
    "use cache: remote";
    cacheTag(`profile`);
    cacheLife("max");
    return await getMeInfoRepository(locale);
}