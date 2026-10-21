"use server";
import { requireSession } from "../../lib/session";
import { createSkillService, getSkillByIdService, getSkillsService, updateSkillService } from "../service/skillService";
import { updateTag } from "next/cache";

export const getSkillsAction = async () => {
    const result = await getSkillsService();
    return result;
}

export const getSkillAction = async (id) => {
    await requireSession();
    const result = await getSkillByIdService(id);
    return result;
}

export const saveSkillAction = async (prevState, value) => {
    await requireSession();
    if (value.id > 0) {
        const result = await updateSkillService(value);
        updateTag(`skills`);
        return {
            success: true,
            message: "Yetenek başarıyla güncellendi",
            data: result
        }
    } else {
        const result = await createSkillService(value);
        updateTag(`skills`);
        return {
            success: true,
            message: "Yetenek başarıyla oluşturuldu",
            data: result
        }
    }
}