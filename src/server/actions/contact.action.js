"use server";
import { createContactService, getContactByIdService } from "../service/contactService";
import { checkLimit, limiters, getClientIp } from "@/lib/rate-limit";
import { requireSession } from "../../lib/session";
import { verifyTurnstile } from "@/lib/turnstile";

export const createContactAction = async (prevState, data) => {

    const verified = await verifyTurnstile(data.turnstileToken);
    if (!verified) {
        return { succces: false, error: "turnstileVerificationFailed" };
    }
    const ip = await getClientIp();

    const byIp = await checkLimit(limiters.contact, `ip:${ip}`);

    if (!byIp.success) {
        return { success: false, error: "tooManyAttempts" };
    }
    try {
        const result = await createContactService(data);
        return {
            success: true,
            message: "success",
        };
    } catch (error) {
        return {
            success: false,
            message: "error",
        };
    }
};

export const getContactByIdAction = async (id) => {
    await requireSession();
    const result = await getContactByIdService(id);
    return {
        success: true,
        data: result,
    };
};