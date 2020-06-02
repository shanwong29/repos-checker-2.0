# build base
FROM node:12.13.0 as builder
WORKDIR /usr/app/client
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install --silent


# start app in development mode 
FROM builder as development
CMD ["npm", "start"]


# build base for production
FROM builder as production-build-stage
COPY ./src ./src
COPY ./public ./public
RUN npm run build


# build static page for production
FROM nginx:1.15.0 as production
COPY --from=production-build-stage /usr/app/client/build /usr/share/nginx/html



