import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/d1';
import { env } from 'cloudflare:workers';
import { apiKey } from '@better-auth/api-key';
import * as schema from '../db/auth-schema';
const db = drizzle(env.DB);

enum Role {
  USER = 'user',
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}

export const auth = betterAuth({
  appName: 'Secret Manager',
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [apiKey()],
  trustedOrigins: ['http://localhost:5174'],
  user: {
    additionalFields: {
      roles: {
        type: [Role.USER, Role.SUPER_ADMIN, Role.ADMIN],
        required: true,
        defaultValue: [Role.USER],
      },
    },
  },
});
