import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const ENCRYPTION_PREFIX = "enc:v1:";

function getEncryptionKey() {
    const key = process.env.ENCRYPTION_KEY;

    if (!key) {
        throw new Error("ENCRYPTION_KEY bulunamadı.");
    }

    const keyBuffer = Buffer.from(key, "base64");

    if (keyBuffer.length !== 32) {
        throw new Error(
            "ENCRYPTION_KEY Base64 encoded 32 byte olmalıdır."
        );
    }

    return keyBuffer;
}

export function isEncrypted(value) {
    return (
        typeof value === "string" &&
        value.startsWith(ENCRYPTION_PREFIX)
    );
}

export function encrypt(value) {
    if (value === null || value === undefined) {
        return value;
    }

    // Zaten encrypted ise tekrar encrypt etme
    if (isEncrypted(value)) {
        return value;
    }

    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(
        ALGORITHM,
        getEncryptionKey(),
        iv
    );

    const encrypted = Buffer.concat([
        cipher.update(String(value), "utf8"),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    const payload = [
        iv.toString("base64"),
        authTag.toString("base64"),
        encrypted.toString("base64")
    ].join(".");

    return `${ENCRYPTION_PREFIX}${payload}`;
}

export function decrypt(value) {
    if (value === null || value === undefined) {
        return value;
    }

    // Şifreli değilse olduğu gibi dön
    if (!isEncrypted(value)) {
        return value;
    }

    const payload = value.slice(ENCRYPTION_PREFIX.length);

    const parts = payload.split(".");

    if (parts.length !== 3) {
        throw new Error("Şifrelenmiş veri formatı geçersiz.");
    }

    const [ivBase64, authTagBase64, encryptedBase64] = parts;

    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        getEncryptionKey(),
        Buffer.from(ivBase64, "base64")
    );

    decipher.setAuthTag(
        Buffer.from(authTagBase64, "base64")
    );

    const decrypted = Buffer.concat([
        decipher.update(
            Buffer.from(encryptedBase64, "base64")
        ),
        decipher.final()
    ]);

    return decrypted.toString("utf8");
}