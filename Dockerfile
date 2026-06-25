# Install deps with Bun (project lockfile); build and serve on Node.
# Building under Bun crashes @react-router/dev ("traverse is not a function") because the
# oven/bun image has no Node for the react-router bin's `env node` shebang; serving under
# Bun crashes react-router-serve. glibc throughout so Bun-installed native deps stay compatible.

FROM node:24 AS build
WORKDIR /app
RUN npm install -g bun
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN npm run build

FROM node:24 AS prod-deps
WORKDIR /app
RUN npm install -g bun
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["npm", "run", "start"]
