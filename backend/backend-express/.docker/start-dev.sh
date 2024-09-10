#!/bin/bash

npm install
npx prisma generate

if [ ! -f .env ]; then
  cp .env.example .env
fi

tail -f /dev/null