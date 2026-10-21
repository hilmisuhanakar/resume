"use server";
import { createEducationService, updateEducationService, deleteEducationService, getEducationByIdService, getEducationsByLanguageIdService, getEducationsService } from "../service/educationService";
import dayjs from "dayjs";
import { requireSession } from "../../lib/session";
import { updateTag } from "next/cache";

export const saveEducationAction = async (prevState, data) => {
    await requireSession();
    if (data.id > 0) {
        const result = await updateEducationService(data);
        updateTag(`education`);
        return { success: true, data: result };
    }
    else {
        const { id, ...rest } = data;
        const result = await createEducationService(rest);
        updateTag(`education`);
        return { success: true, data: result };
    }
}

export const getEducationsAction = async () => {
    await requireSession();
    const result = await getEducationsService();
    return result;
};

export const getEducationByIdAction = async (id) => {
    await requireSession();
    const result = await getEducationByIdService(id);
    return result;
}

export const getEducationsByLanguageIdAction = async (locale) => {
    const result = await getEducationsByLanguageIdService(locale);
    const data = result.map((item) => ({
        id: item.id,
        date: `${dayjs(item.startDate).format("YYYY")} - ${dayjs(item.endDate).format("YYYY")}`,
        position: item.degree,
        company: item.school,
        description: item.description,
    }));
    return data;
}