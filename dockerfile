FROM node:16-slim

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]
