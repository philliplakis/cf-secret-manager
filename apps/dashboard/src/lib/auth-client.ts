import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { apiKeyClient } from '@better-auth/api-key/client';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:8788',
  plugins: [
    apiKeyClient(),
    inferAdditionalFields({
      user: {
        roles: {
          type: 'string',
        },
      },
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
