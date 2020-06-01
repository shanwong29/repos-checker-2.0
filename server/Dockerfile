FROM node:12.13.0

WORKDIR /usr/app/backend

COPY package*.json ./

COPY tsconfig.json ./

RUN npm i

ENTRYPOINT ["npm", "run", "dev"]