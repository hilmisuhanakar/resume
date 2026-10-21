import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { verifySession } from "./lib/session-token";

const intlMiddleware = createMiddleware(routing);

async function readSession(request) {
    const token = request.cookies.get("user")?.value;
    if (!token) {
        return null;
    }
    return await verifySession(token);
}

export default async function Proxy(request) {
    const { pathname } = request.nextUrl;
    const isAdmin = pathname.startsWith("/admin");
    const isAuthPage = pathname.startsWith("/admin/auth");

    if (!isAdmin) {
        return intlMiddleware(request);
    }

    const session = await readSession(request);
    const stale = Boolean(request.cookies.get("user")) && !session;

    if (session && isAuthPage) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (!session && !isAuthPage) {
        const response = NextResponse.redirect(new URL("/admin/auth", request.url));
        if (stale) response.cookies.delete({ name: "user", path: "/" });
        return response;
    }

    if (stale) {
        const response = NextResponse.next();
        response.cookies.delete({ name: "user", path: "/" });
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};