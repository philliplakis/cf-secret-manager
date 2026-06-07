import { createMiddleware } from "hono/factory";

export const analytics = createMiddleware(async (c, next) => {
  c.env.sds;
  console.log(`[Analytics]:[${new Date().toISOString()}]:[${c.req.method}] ${c.req.path} ${c.req.query().url}`);
  await next();
});
