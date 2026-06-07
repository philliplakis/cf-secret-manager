# Cloudflare Secret Manager

Turborepo monorepo for managing secrets across Cloudflare, GitHub, and AWS.

## Structure

```
├─ apps/
│  ├─ dashboard/              # Vite + React dashboard
│  ├─ backend/                    # Hono API (Bun)
│  └─ docs/                   # VitePress docs site
│
├─ packages/
│  ├─ cli/                    # cfsm CLI
│  ├─ core/                   # Shared domain logic
│  ├─ crypto/                 # Encryption/decryption utilities
│  ├─ config/                 # Shared config/env parsing
│  ├─ types/                  # Shared API/domain types
│  ├─ typescript-sdk/         # JS/TS SDK
│
├─ tooling/
│  ├─ tsconfig/
│  └─ prettier-config/
│
└─ scripts/
   └─ release.ts
```

## Prerequisites

- [Bun](https://bun.sh) 1.2+
- TypeScript 6 + [tsgo](https://github.com/microsoft/typescript-go) for type-checking

## Getting started

```bash
bun install
bun dev
```

## Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start all apps in dev mode |
| `bun run build` | Build all packages and apps |
| `bun run typecheck` | Run tsgo type checks across the monorepo |
| `bun run lint` | Lint all packages |
| `bun run release` | Run release workflow |

## Apps

### Dashboard (`apps/dashboard`)

Vite + React app on port 5173 by default.

```bash
bun --filter @cfsm/dashboard dev
```

### API (`apps/backend`)

Hono API served by Bun on port 8787 by default.

```bash
bun --filter @cfsm/backend dev
```

### Docs (`apps/docs`)

VitePress documentation site.

```bash
bun --filter @cfsm/docs dev
```

## License

MIT
