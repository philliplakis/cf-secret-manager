import { Config, defineConfig } from 'drizzle-kit';
import path from 'path';
import fs from 'fs';

function getLocalD1DB() {
  try {
    // bunx wrangler d1 execute DB --local --command='SELECT 1'
    // to generate the .sqlite file
    const basePath = path.resolve('.wrangler/state/v3/d1');
    const dbFile = fs
      .readdirSync(basePath, { encoding: 'utf-8', recursive: true })
      .find((f) => f.endsWith('.sqlite'));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = path.resolve(basePath, dbFile);

    console.log('Local D1 DB URL:', url);
    return url;
  } catch (err) {
    console.log(`Error  ${err instanceof Error ? err.message : 'Unknown error'}`);
    return '';
  }
}

const base = {
  out: './drizzle',
  schema: ['./src/db/schema.ts', './src/db/auth-schema.ts'],
  dialect: 'sqlite',
};

const localConfig = {
  ...base,
  dbCredentials: {
    url: getLocalD1DB(),
  },
};

const remoteConfig = {
  ...base,
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
};

const config: Config =
  process.env.NODE_ENV === 'production' ? (remoteConfig as Config) : (localConfig as Config);
export default defineConfig(config);
