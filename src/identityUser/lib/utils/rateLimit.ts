// utils/rateLimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";


const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const resetPasswordLimiter = new Ratelimit({
    redis, // instance
    limiter: Ratelimit.slidingWindow(1, "2 m"), // 1 request per 2 minutes
    analytics: true,
});
