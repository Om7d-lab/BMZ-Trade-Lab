# Production deployment

## Required services

Deploy the web and API as separate containers/services. Use managed PostgreSQL with backups and point-in-time recovery, managed Redis, S3-compatible encrypted object storage, a transactional email provider, centralized logs/error tracking, TLS, and a secrets manager.

## Before launch

1. Replace all local secrets, restrict CORS to the production web origin, and use HTTPS-only secure cookies for refresh sessions.
2. Run Prisma migrations in a release job; do not run `migrate dev` in production.
3. Configure object-storage lifecycle rules, virus scanning for uploads, rate limits, CSP, and a data-retention/export/deletion policy.
4. Complete legal review for privacy, terms, billing, broker/API agreements, market-data redistribution rights, and the non-advisory disclaimer.
5. Keep broker sync, historical data, AI, and payments disabled until their credentials, compliance review, telemetry, and failure handling are verified.
