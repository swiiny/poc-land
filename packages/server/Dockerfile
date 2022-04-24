FROM node:16.14.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]