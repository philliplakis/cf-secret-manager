import type { Secret } from '@cfsm/types';
import { asc } from 'drizzle-orm';
import { secrets } from '../../db/schema';
import { DB } from '../../db/types';

export class SecretsRepository {
  constructor(private readonly db: DB) {}

  async listSecrets(): Promise<Secret[]> {
    return this.db.select().from(secrets).orderBy(asc(secrets.name));
  }
}