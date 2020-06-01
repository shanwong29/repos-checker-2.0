# Docker Image which is used as foundation to create a custom Docker Image with this Dockerfile
# The foundational image (here FROM) we are using here makes sure that all Node/npm commands 
# are available in the Dockerfile. Otherwise, if using a non related Node image, 
# we would need to install Node in the Dockerfile ourselves before we could use the Node specific commands.
FROM node:12.13.0

# set working directory
WORKDIR /usr/app/client

# copy json files in to WORKDIR
COPY package*.json ./
COPY tsconfig.json ./

# install and cache app dependencies
RUN npm install --silent

# start app
CMD ["npm", "start"]

# build app
# COPY . usr/app/client
# RUN npm run build

# stage 2 - build the final image and copy the react build files
# FROM nginx:1.13.12-alpine
# COPY --from=build /usr/app/client/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
