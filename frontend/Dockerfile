FROM node:22.15-bookworm-slim AS base

# -------------------------------------------------------
# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# -------------------------------------------------------
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG VITE_VERSION=latest
ARG VITE_GRAASP_API_HOST
ARG VITE_UMAMI_WEBSITE_ID
ARG VITE_UMAMI_HOST
ARG VITE_SENTRY_ENV
ARG VITE_SENTRY_DSN
ARG VITE_RECAPTCHA
ARG VITE_GRAASP_H5P_INTEGRATION_URL
ARG VITE_GRAASP_REDIRECTION_HOST

# Install pnpm in the builder stage
RUN npm install -g pnpm

# Build the application
RUN pnpm vite build

# -------------------------------------------------------
# Production image, copy all the files and run the server
FROM joseluisq/static-web-server:2 AS runner
WORKDIR /app
# Copy only necessary files
COPY --from=builder /app/build .

CMD [ "-d", "/app" ]
