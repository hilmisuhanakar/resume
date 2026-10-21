"use server";
import { createExperienceService, getExperienceByIdService, getExperienceByLocaleService, getExperiencesService, updateExperienceService } from "../service/experienceService";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { requireSession } from "../../lib/session";
import { updateTag } from "next/cache";

export async function getExperiencesAction() {
    const result = await getExperiencesService();
    return result;
}

export async function saveExperienceAction(prevState, values) {
    await requireSession();
    if (values.id > 0) {
        const result = await updateExperienceService(values);
        updateTag(`experience`);
        return { success: true, data: result };
    } else {
        const { id, ...rest } = values;
        const result = await createExperienceService(rest);
        updateTag(`experience`);
        return { success: true, data: result };
    }
}

export async function getExperienceByIdAction(profileId) {
    await requireSession();
    const result = await getExperienceByIdService(profileId);
    const data = {
        id: result.id,
        languageId: result.languageId,
        startDate: result.startDate,
        endDate: result.endDate,
        company: result.company,
        position: result.position,
        description: result.description,
    }
    return data;
}

export async function getExperienceByLocaleAction(locale) {
    const result = await getExperienceByLocaleService(locale);
    const data = result.map(item => ({
        id: item.id,
        languageId: item.languageId,
        date: `${dayjs(item.startDate).locale(locale).format("MMMM YYYY")} - ${dayjs(item.endDate).locale(locale).format("MMMM YYYY")}`,
        company: item.company,
        position: item.position,
        description: item.description,
    }));
    return data;
}