FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile=false
COPY apps/web apps/web
RUN pnpm --filter @bmz/web build
EXPOSE 3000
CMD ["pnpm", "--filter", "@bmz/web", "start"]

