import { customType } from "drizzle-orm/pg-core";
import { encrypt, decrypt } from "../../../lib/encryption";

export const encryptedText = customType({
    dataType() {
        return "text";
    },

    toDriver(value) {
        if (value === null || value === undefined) {
            return value;
        }

        return encrypt(value);
    },

    fromDriver(value) {
        if (value === null || value === undefined) {
            return value;
        }

        return decrypt(value);
    }
});