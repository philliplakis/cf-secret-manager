# Introduction

Cloudflare Secret Manager (CFSM) is a monorepo for managing secrets across providers.

## Monorepo structure

- **apps/dashboard** – Vite + React dashboard
- **apps/api** – Hono API (Bun)
- **apps/docs** – Documentation site
- **packages/** – Shared libraries (SDK, CLI, core, crypto, db, auth, etc.)

## Getting started

```bash
bun install
bun dev
```
