import "server-only";
import { cookies } from "next/headers";
import { verifySession } from "./session-token";
import { redirect } from "next/navigation";
export async function getSession() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("user")?.value;
        if (!token) {
            return null;
        }
        const payload = await verifySession(token);
        if (!payload) {
            return null;
        }
        return {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            hasTotp: payload.hasTotp,
        };
    } catch (error) {
        return null;
    }
}

export async function requireSession() {
    const session = await getSession();
    if (!session) {
        redirect("/admin/auth");
    }
    return session;
}