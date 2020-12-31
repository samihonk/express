FROM node:15.3.0-alpine as devApi

WORKDIR /app

COPY package* ./

RUN apk update && npm install 

COPY src ./src/

COPY config ./config/

FROM node:15.3.0-alpine as devClient

WORKDIR /client

COPY client/package* ./

RUN apk update && npm install

COPY client/public ./public/
COPY client/src ./src/