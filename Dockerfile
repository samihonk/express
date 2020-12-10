FROM node:15.3.0-alpine

WORKDIR /app

RUN apk update && npm install 