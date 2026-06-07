import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:8788',
  plugins: [
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
