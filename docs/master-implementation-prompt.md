# BMZ Trade Lab implementation prompt

Build an original, production-ready, English-first trading journal SaaS called **BMZ Trade Lab**. Do not copy any competitor’s branding, screenshots, copy, or exact UI. Use a premium dark graphite/navy visual system with emerald/teal accents, strong accessibility, responsive layouts, and localization readiness for English, Persian, Arabic, Spanish, Portuguese, Simplified Chinese, Japanese, and Turkish; Persian/Arabic are RTL.

Create a TypeScript monorepo with a Next.js web app and NestJS REST/OpenAPI API. Use PostgreSQL/Prisma for multi-tenant data, Redis/BullMQ for jobs, and S3-compatible storage for attachments. Include Docker Compose, environment examples, secure auth, workspace roles, audit events, demo seed data, tests, CI, and deployment instructions.

Deliver a working core: manual trade/execution entry; CSV preview, mapping, validation, deduplication, import history and rollback; accounts for stocks/futures/forex/crypto/options; P&L, commissions, R-multiple, risk metrics, tags, ratings, screenshots, notes, review status, playbooks and rule adherence; daily journal/templates/calendar; dashboards and reports; and Prepare/Trade/Reflect progress rules with streaks and daily locking.

Design advanced features as secure modules, never as misleading mock integrations: encrypted broker/prop connectors with retries and reconciliation; historical data adapters feeding interactive chart, replay, and simulated backtest sessions; a permission-scoped AI layer with provenance, feedback controls, opt-out, and no trading advice/execution; and mentor/mentee invitations with scoped viewing/commenting, revocation, and auditing. Make all external providers configuration-driven and disabled until valid credentials/licenses are supplied. Launch free; represent future billing with entitlement abstractions rather than active charging.

Verify calculations, import quality, tenant isolation, authorization, locale/RTL layouts, accessibility, responsive views, and the end-to-end flow from onboarding through import/manual entry, review, playbook/rule completion, dashboard, and reports.
