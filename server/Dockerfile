FROM node:12.13.0 as builder
WORKDIR /usr/app/backend
COPY package*.json ./
COPY tsconfig.json ./
RUN npm i


FROM builder as development
ENTRYPOINT ["npm", "run", "dev"]


FROM builder as production
COPY ./src ./src
ENTRYPOINT ["npm", "run", "prod"]

