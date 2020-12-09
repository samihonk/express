FROM node:15.3.0-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && npm install 