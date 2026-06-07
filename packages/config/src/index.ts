export type Env = {
  NODE_ENV: 'development' | 'production' | 'test';
  API_URL?: string;
};

export function parseEnv(env: Record<string, string | undefined>): Env {
  return {
    NODE_ENV: (env.NODE_ENV as Env['NODE_ENV']) ?? 'development',
    API_URL: env.API_URL,
  };
}
