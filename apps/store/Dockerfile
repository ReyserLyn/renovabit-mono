FROM oven/bun:1.2-alpine AS base

WORKDIR /app
RUN apk add --no-cache libc6-compat

# === Etapa de pruning ===
FROM base AS pruner
RUN bun add -g turbo
COPY . .
RUN turbo prune store --docker

# === Etapa combinada: deps + builder ===
FROM base AS builder
COPY --from=pruner /app/out/json/ .
COPY bun.lock ./bun.lock

RUN bun install --no-save --frozen-lockfile

# Copiar código fuente y buildar
COPY --from=pruner /app/out/full/ .

ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

RUN bunx turbo run build --filter=store

# === Imagen final ===
FROM oven/bun:1.2-alpine AS runner

WORKDIR /app

# Variables de entorno
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# crear usuario
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Solo copiar el standalone build
COPY --from=builder --chown=nextjs:nodejs /app/apps/store/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/store/.next/static ./apps/store/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/store/public ./apps/store/public

USER nextjs

EXPOSE 3000

CMD ["bun", "apps/store/server.js"]
