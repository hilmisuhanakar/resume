import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const redis = Redis.fromEnv();

export const limiters = {
    login: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "15 m"),
        prefix: "rl:login",
    }),
    totp: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "5 m"),
        prefix: "rl:totp",
    }),
    contact: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        prefix: "rl:contact",
    }),
};

export async function getClientIp() {
    const h = await headers();
    return h.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}

export async function checkLimit(limiter, key) {
    try {
        const { success, reset } = await limiter.limit(key);
        return {
            success,
            retryAfter: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
        };
    } catch (error) {
        return { success: false, retryAfter: 0 };
    }
}