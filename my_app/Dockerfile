FROM node:19.5.0-alpine3.16 as base

WORKDIR /app
COPY package*.json .

FROM base as pro
ENV NODE_ENV=pro
RUN npm ci --only=production
COPY . .
CMD [ "npm", "start" ]

FROM base as dev
ENV NODE_ENV=dev
RUN npm install -g nodemon && npm install
COPY . .
CMD [ "npm", "start:dev" ]