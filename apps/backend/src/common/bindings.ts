export interface Bindings extends CloudflareBindings {
  readonly DB: D1Database;
  readonly RATE_LIMITER: RateLimit;
  readonly KV: KVNamespace;
  readonly STORAGE: R2Bucket;
}
