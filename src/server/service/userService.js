import "server-only";

import { createEmailLookup } from "@/lib/lookup";
import { hashPassword, verifyPassword } from "@/lib/password";
import { insertUser, getUserById, findByEmailLookupRepository, updateUserTwoFactorRepository } from "@/server/repository/userRepository";

export async function createUser(data) {
    data.passwordHash = await hashPassword(data.password);
    data.email = data.email.trim().toLowerCase();
    data.emailLookup = createEmailLookup(data.email);
    const user = await insertUser(data);

    return user;
}

export async function getUser(id) {
    const user = await getUserById(id);

    return user;
}

export async function findByEmailLookup(email, password) {
    const user = await findByEmailLookupRepository(createEmailLookup(email));
    if (!user) {
        throw new Error("Email or password is incorrect.");
    }
    
    const passwordValid = await verifyPassword(
        password,
        user.passwordHash
    );
    
    if (!passwordValid) {
        throw new Error("Email or password is incorrect.");
    }

    return user;
}

export async function updateUserTwoFactorService(id, secret) {
    return await updateUserTwoFactorRepository(id, secret);
}