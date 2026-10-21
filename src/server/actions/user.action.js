"use server";

import { verifyTotp } from "@/lib/totp";
import { findByEmailLookup } from "../service/userService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkLimit, limiters, getClientIp } from "@/lib/rate-limit";
import { signSession } from "@/lib/session-token";
import { verifyTurnstile } from "@/lib/turnstile";

export async function findByEmailLookupAction(prevState, values) {
    const verified = await verifyTurnstile(values.turnstileToken);
    if (!verified) {
        return { success: false, error: "Turnstile doğrulama başarısız oldu. Lütfen tekrar deneyiniz." };
    }
    let result = null;
    try {
        const ip = await getClientIp();
        const email = values.email.trim().toLowerCase();

        const byIp = await checkLimit(limiters.login, `ip:${ip}`);
        const byEmail = await checkLimit(limiters.login, `email:${email}`);

        if (!byIp.success || !byEmail.success) {
            return { success: false, error: "Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyiniz." };
        }
        const user = await findByEmailLookup(values.email, values.password);
        if (user.totp && values.code) {
            result = await verifyTwoFactorAction(values.code, user);
        }
        else if (user.totp && !values.code) {
            return { success: true, hasTotp: true };
        }
        else {
            result = await login(user);
        }

    } catch (error) {
        return { success: false, error: error.message };
    }

    if (result) {
        redirect("/admin/dashboard");
    }
}

async function verifyTwoFactorAction(code, user) {
    const ip = await getClientIp();
    const byIp = await checkLimit(limiters.totp, `ip:${ip}`);
    const byId = await checkLimit(limiters.totp, `id:${user.id}`);

    if (!byIp.success || !byId.success) {
        throw new Error("Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyiniz.");
    }

    const result = await verifyTotp(code, user.totp);

    if (!result)
        throw new Error("Kod hatalı.");

    if (result) {
        return await login(user);
    }
}

async function login(user) {
    const ip = await getClientIp();
    const email = user.email.trim().toLowerCase();
    
    await limiters.login.resetUsedTokens(`ip:${ip}`);
    await limiters.login.resetUsedTokens(`email:${email}`);
    await limiters.totp.resetUsedTokens(`id:${user.id}`);
    await limiters.totp.resetUsedTokens(`ip:${ip}`);

    const cookieStore = await cookies();

    const token = await signSession({
        id: user.id,
        name: user.name,
        email: user.email,
        hasTotp: user.totp ? true : false,
        projectV: process.env.projectV,
    });

    cookieStore.set(
        "user",
        token,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: (60 * 60 * 24 * parseInt(process.env.SESSION_MAX_AGE)),
            path: "/",
            sameSite: "strict",
        }
    );
    return true;
}