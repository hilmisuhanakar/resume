import crypto from "crypto";

function normalizeEmail(email) {
    return email
        .trim()
        .toLowerCase();
}

export function createEmailLookup(email) {
    const normalizedEmail = normalizeEmail(email);

    const key = process.env.LOOKUP_KEY;

    if (!key) {
        throw new Error("LOOKUP_KEY bulunamadı.");
    }

    return crypto
        .createHmac("sha256", key)
        .update(normalizedEmail)
        .digest("hex");
}