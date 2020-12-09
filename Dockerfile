FROM node:15.3.0-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && npm install 

COPY ./src/ ./src
COPY ./config/ ./config

CMD [ "npm", "run", "start" ]