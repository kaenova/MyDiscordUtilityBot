FROM node:17-alpine3.14

RUN apk update && apk add --no-cache tzdata
ENV TZ="Asia/Jakarta"

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn", "start"]