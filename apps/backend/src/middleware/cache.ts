import type { Context, Next } from "hono";
import { cache } from "hono/cache";

export const cacheMiddleware = (c: Context, next: Next) => {
    if (process.env.NODE_ENV === "development") {
      return next();
    }
  
    return cache({
      cacheName: "engine",
      cacheControl: "max-age=3600",
    })(c, next);
  };