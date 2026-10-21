import { generateSecret, generateURI, verify } from "otplib";

export function createTotpSecret() {
    return generateSecret();
}

export function createTotpUri(email, secret) {
    return generateURI({
        issuer: "Resume - Admin Panel",
        label: email,
        secret
    });
}

export async function verifyTotp(token, secret) {

    const result = await verify({
        token,
        secret
    });

    return result.valid;
}