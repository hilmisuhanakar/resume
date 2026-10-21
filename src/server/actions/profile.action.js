"use server";
import { updateTag } from "next/cache";
import { requireSession } from "../../lib/session";
import { getProfileServices, getProfileByIdServices, createProfileServices, updateProfileServices, deleteProfileServices, getMeInfoServices } from "../service/profileService";

export async function getProfileAction(pageIndex, pageSize, sorting) {
    await requireSession();
    const result = await getProfileServices(pageIndex, pageSize, sorting);
    return result;
}

export async function getProfileByIdAction(id) {
    await requireSession();
    return await getProfileByIdServices(id);
}

export async function createProfileAction(data) {
    await requireSession();
    const result = await createProfileServices(data);
    updateTag(`profile`);
    return result;
}

export async function updateProfileAction(data) {
    await requireSession();
    const result = await updateProfileServices(data);
    updateTag(`profile`);
    return result;
}

export async function deleteProfileAction(id) {
    await requireSession();
    const result = await deleteProfileServices(id);
    updateTag(`profile`);
    return result;
}

export async function saveProfileAction(prevState, data) {
    await requireSession();
    if (data.id > 0) {
        await updateProfileAction(data);
    } else {
        const { id, ...rest } = data;
        await createProfileAction(rest);
    }
    return {
        success: true,
        message: "Profil başarıyla kaydedildi.",
        data: data,
    }
}

export async function getMeInfoAction(locale) {
    return await getMeInfoServices(locale);
}