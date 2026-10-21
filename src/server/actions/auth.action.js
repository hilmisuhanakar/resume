"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("user");
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
    redirect("/admin/auth");
}