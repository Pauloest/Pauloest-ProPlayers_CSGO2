#!/bin/bash

npm install
npm run build
# comando para executar a migração do banco
npx prisma migrate dev
npm run start:dev