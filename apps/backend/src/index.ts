import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { requestId } from 'hono/request-id';

import health from './routes/health';
import { auth } from './lib/auth';

const allowedOrigins = ['http://localhost:5174'];

const app = new Hono<{ Bindings: CloudflareBindings }>({});

app.use('*', requestId());
app.use(
  '*',
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);
// global error handle:
app.use('*', async (c, next) => {
  try {
    await next();
  } catch (err) {
    const error = err as Error;
    console.error('[GLOBAL ERROR]', error.message);
    return c.json({ error: error.message }, 500);
  }
});
app.get('/', (c) => c.text('Hello Hono!'));
app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));

app.route('/health', health);

export default {
  fetch: app.fetch,
  // queue: consumer,
};
