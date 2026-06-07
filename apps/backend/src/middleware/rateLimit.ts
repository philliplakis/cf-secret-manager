import { cloudflareRateLimiter } from "@hono-rate-limiter/cloudflare";
import type { Bindings } from "../common/bindings";

export const limiter = cloudflareRateLimiter<{ Bindings: Bindings }>({
  rateLimitBinding: (c) => c.env.RATE_LIMITER,
  keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "",
});
