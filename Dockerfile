# stage 1: production-ready build
FROM node:latest AS build
ENV backend_url ${backend_url}
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN npm run build 
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]