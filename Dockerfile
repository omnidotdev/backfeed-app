# multi-stage build (designed for production)
# NB: standard Next.js environment variables are not injected here, they are intended to be injected by the platform (Kubernetes, cloud provider, or similar)
# ! NB: Next.js `standalone` mode must be enabled (https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects)

FROM oven/bun AS base

# install dependencies only when needed
FROM base AS deps

WORKDIR /app

# install dependencies
COPY package.json bun.lockb panda.config.ts ./
# `apt` commands below are a workaround for blocked builds on some systems: https://github.com/oven-sh/bun/issues/9807#issuecomment-2218837172
RUN apt update && apt install python3 python3-pip make g++ -y
RUN bun install --frozen-lockfile

# rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# disable telemetry during build (https://nextjs.org/telemetry)
ENV NEXT_TELEMETRY_DISABLED=1

ARG WALLETCONNECT_PROJECT_ID

RUN bun prepare
RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# disable telemetry during runtime (https://nextjs.org/telemetry)
ENV NEXT_TELEMETRY_DISABLED=1

RUN adduser --system --uid 1001 nextjs

# automatically leverage output traces to reduce image size (https://nextjs.org/docs/advanced-features/output-file-tracing)
COPY --from=builder --chown=nextjs:bun /app/public ./public
COPY --from=builder --chown=nextjs:bun /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bun /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["bun", "server.js"]
