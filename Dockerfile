FROM node:15.3.0-alpine as devApi

WORKDIR /server

RUN apk update && apk upgrade

FROM node:15.3.0-alpine as devClient

WORKDIR /client

RUN apk update && apk upgrade

FROM node:15.3.0-alpine as build

WORKDIR /express

COPY . .

ARG REACT_APP_BASE_URL 
ARG INLINE_RUNTIME_CHUNK

RUN apk add yarn && apk update && apk upgrade && yarn install --prod && yarn build

FROM alpine:latest as prod

WORKDIR /express

COPY package* ./
COPY yarn* ./
COPY server/ ./server/
COPY --from=build /express/client/build ./client/build

RUN apk update && apk add nodejs yarn && apk upgrade && yarn install --prod