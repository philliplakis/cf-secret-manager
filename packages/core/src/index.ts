import type { Secret } from '@cfsm/types';

export function validateSecretName(name: string): boolean {
  return name.length > 0 && /^[a-zA-Z0-9_\-./]+$/.test(name);
}

export function createSecret(name: string): Pick<Secret, 'name' | 'createdAt' | 'updatedAt'> {
  const now = new Date().toISOString();
  return { name, createdAt: now, updatedAt: now };
}
