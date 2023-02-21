FROM node:16

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY src src
CMD yarn ts-node src/index.ts
