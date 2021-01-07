FROM node:15.3.0-alpine as devApi

WORKDIR /server

RUN apk update && apk upgrade

FROM node:15.3.0-alpine as devClient

WORKDIR /client

RUN apk update && apk upgrade