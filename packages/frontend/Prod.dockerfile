FROM node:16.13.0-alpine

ENV PORT 8080
ENV NODE_ENV production

RUN apk add --update npm

# Create app directory
RUN mkdir -p /frontend/app/
WORKDIR /frontend/app/

# Installing dependencies
COPY package*.json /frontend/app/

RUN npm install 

# Copying source files
COPY . /frontend/app/

# Building app
RUN npm run build

EXPOSE 8080

# Running the app
CMD "npm" "run" "start"