FROM node:16.10.0-alpine3.11

WORKDIR /app

COPY . .

RUN yarn

CMD ["node", "src/index.js"]