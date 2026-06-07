import { drizzle } from 'drizzle-orm/d1';
import type { Bindings } from '../../common/bindings';
import { Hono } from 'hono';
import { user } from '../../db/auth-schema';

const app = new Hono<{ Bindings: Bindings }>({});

app.get('/', async (c) => {
  const kv = await c.env.KV.get('kv-test');
  const db = drizzle(c.env.DB);
  const [d1] = await db.select().from(user).limit(1);
  return c.json({ msg: 'ok', data: { kv, d: !!d1 } });
});

export default app;
