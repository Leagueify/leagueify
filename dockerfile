FROM node:18.12.1-alpine3.17 as development

WORKDIR /usr/src/app
COPY . ./

RUN npm install

# Generate Licenses
RUN node scripts/getLicenses.mjs

# Configure User Service
COPY ./services/user/pages ./pages
COPY ./services/user/public ./public
COPY ./services/user/styles ./styles

FROM development as builder

RUN npm run build
RUN npm ci

FROM builder as production

WORKDIR /app
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public

CMD [ "npm", "start" ]
