FROM node:15.3.0-alpine as devApi

WORKDIR /server

RUN apk update && apk upgrade

FROM node:15.3.0-alpine as devClient

WORKDIR /client

RUN apk update && apk upgrade

FROM node:15.3.0-alpine as prod

WORKDIR /express

COPY . .

ARG REACT_APP_BASE_URL 
ARG INLINE_RUNTIME_CHUNK

RUN apk add yarn && apk update && apk upgrade && yarn install && yarn build