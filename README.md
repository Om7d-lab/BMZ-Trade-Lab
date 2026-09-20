# BMZ Trade Lab

An original, global trading-journal SaaS. It is English-first and localization-ready for Persian, Arabic, Spanish, Portuguese, Simplified Chinese, Japanese, and Turkish.

## Local development

1. Install Node 20+ and pnpm 9+.
2. Copy `.env.example` to `.env`.
3. Start local dependencies: `docker compose up -d`.
4. Install packages: `pnpm install`.
5. Generate and migrate the database: `pnpm db:generate && pnpm db:migrate`.
6. Seed a demo workspace: `pnpm db:seed`.
7. Start both services: `pnpm dev`.

The web app runs at `http://localhost:3000`; the OpenAPI API runs at `http://localhost:4000/api/docs`.

## Security and provider configuration

The local credentials are development-only. Set long secrets, TLS-backed managed Postgres/Redis/object storage, email, payment, AI, market-data, and broker provider credentials before production. Broker synchronization is deliberately disabled until each provider adapter is configured and reviewed.

## Repository layout

- `apps/web` — Next.js marketing site and authenticated product UI.
- `apps/api` — NestJS REST/OpenAPI API, Prisma schema, import pipeline, and seed script.
- `docs` — product research, architecture, deployment, and a reusable build prompt.
