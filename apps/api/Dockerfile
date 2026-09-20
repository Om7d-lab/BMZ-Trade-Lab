FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json apps/api/package.json
RUN pnpm install --frozen-lockfile=false
COPY apps/api apps/api
RUN pnpm --filter @bmz/api prisma:generate && pnpm --filter @bmz/api build
EXPOSE 4000
CMD ["pnpm", "--filter", "@bmz/api", "start"]

