FROM node:18.12.1-alpine3.17 as development
USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package.json package-lock.json ./

ARG PUBLIC_SENTRY=true
ARG PUBLIC_SENTRY_DSN
ENV PUBLIC_SENTRY=$PUBLIC_SENTRY
ENV PUBLIC_SENTRY_DSN=$PUBLIC_SENTRY_DSN

RUN npm install

COPY --chown=node:node . .

# Generate Licenses
# RUN node scripts/getLicenses.mjs

# Generate Prisma Client
RUN npx prisma generate

FROM development as builder

RUN npm run build
RUN npm ci

FROM builder as production

WORKDIR /app
COPY --chown=node:node --from=builder /home/node/app/build .
COPY --chown=node:node --from=builder /home/node/app/package.json .
COPY --chown=node:node --from=builder /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/prisma ./prisma

CMD [ "npm", "start" ]
