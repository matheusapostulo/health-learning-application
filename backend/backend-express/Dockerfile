FROM node:20-slim AS build

RUN apt update && apt install -y openssl procps iputils-ping

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

CMD ["/home/node/app/.docker/start-dev.sh"]

# RUN npm config set cache /home/node/app/.npm-cache --global

# COPY package*.json .

# RUN npm install

# COPY . .

# RUN npx prisma generate

# CMD tail -f /dev/null