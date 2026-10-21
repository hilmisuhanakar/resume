"use server";
import QRCode from "qrcode";

import { createTotpSecret, createTotpUri, verifyTotp } from "@/lib/totp";
import { updateUserTwoFactorService } from "../service/userService";
import { logout } from "./auth.action";
import { requireSession } from "../../lib/session";

export async function setupTwoFactorAction() {
    const user = await requireSession();
    
    const email = user.email;

    const secret = createTotpSecret();

    const uri = createTotpUri(
        email,
        secret
    );

    const qrCode = await QRCode.toDataURL(uri)

    return {
        secret,
        qrCode
    };
}

export async function verifyTotpAction(code, secret) {
    const user = await requireSession();
    const result = await verifyTotp(code, secret);
    if(result){
        await updateUserTwoFactorService(user.id, secret);
        await logout();
    }
    return result;
}