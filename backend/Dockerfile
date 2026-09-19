# ── Stage 1: Dependencies ─────────────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Create a non-root user for security
RUN addgroup -S apnastay && adduser -S apnastay -G apnastay

# Copy installed modules and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Switch to non-root user
USER apnastay

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "server.js"]
