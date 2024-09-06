FROM node:16-alpine AS build

WORKDIR /home/node/app

RUN npm config set cache /home/node/app/.npm-cache --global

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

CMD tail -f /dev/null