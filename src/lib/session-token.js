import { SignJWT, jwtVerify } from "jose";

function getKey() {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("SESSION_SECRET tanımlı değil veya çok kısa.");
    }
    return new TextEncoder().encode(secret);
}

export async function signSession(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${(60 * 60 * 24 * parseInt(process.env.SESSION_MAX_AGE))}s`)
        .sign(getKey());
}

export async function verifySession(token) {
    try {
        const { payload } = await jwtVerify(token, getKey(), { algorithms: ["HS256"] });
        if (payload.projectV !== process.env.projectV) return null;
        return payload;
    } catch {
        return null;
    }
}