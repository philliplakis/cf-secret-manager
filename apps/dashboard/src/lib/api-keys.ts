export const API_KEY_PREFIX = 'cfsm-';
export const API_KEY_DEFAULT_CONFIG_ID = 'default';

export const API_KEY_LIST_LIMIT = 3;
export const API_KEY_LIST_SORT_BY = 'createdAt' as const;
export const API_KEY_LIST_SORT_DIRECTION = 'desc' as const;

export const API_KEY_EXPIRY_OPTIONS = [
  { label: '7 days', value: String(60 * 60 * 24 * 7) },
  { label: '30 days', value: String(60 * 60 * 24 * 30) },
  { label: '90 days', value: String(60 * 60 * 24 * 90) },
  { label: '1 year', value: String(60 * 60 * 24 * 365) },
  { label: 'Never', value: 'never' },
] as const;

export const DEFAULT_API_KEY_EXPIRY = API_KEY_EXPIRY_OPTIONS[0].value;

export function generateApiKeyName() {
  const date = new Date().toISOString().slice(0, 10);
  const suffix = crypto.randomUUID().slice(0, 8);
  return `${API_KEY_PREFIX}${date}-${suffix}`;
}

export type ApiKeyRecord = {
  id: string;
  configId?: string | null;
  name: string | null;
  prefix: string | null;
  start: string | null;
  expiresAt: Date | string | null;
  metadata: string | Record<string, unknown> | null;
  createdAt: Date | string;
};

export function parseApiKeyMetadata(metadata: ApiKeyRecord['metadata']) {
  if (!metadata) {
    return {};
  }

  if (typeof metadata === 'string') {
    try {
      return JSON.parse(metadata) as Record<string, string>;
    } catch {
      return {};
    }
  }

  return Object.fromEntries(Object.entries(metadata).map(([key, value]) => [key, String(value)]));
}

export function formatApiKeyExpiry(expiresAt: ApiKeyRecord['expiresAt']) {
  if (!expiresAt) {
    return 'Never';
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(expiresAt));
}

export function formatApiKeyPreview(apiKey: ApiKeyRecord) {
  const prefix = apiKey.prefix ?? API_KEY_PREFIX;
  const start = apiKey.start ?? '••••';
  return `${prefix}${start}${'•'.repeat(12)}`;
}
