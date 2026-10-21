import "server-only";

import { db } from "@/server/db";
import { users } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";

export async function insertUser(data) {
    const [user] = await db
        .insert(users)
        .values(data)
        .returning();

    return user;
}

export async function getUserById(id) {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

    return user ?? null;
}

export async function findByEmailLookupRepository(emailLookup) {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.emailLookup, emailLookup))
        .limit(1);

    return user ?? null;
}

export async function updateUserTwoFactorRepository(id, secret) {
    const [user] = await db
        .update(users)
        .set({totp: secret})
        .where(eq(users.id, id))
        .returning();

    return true;
}