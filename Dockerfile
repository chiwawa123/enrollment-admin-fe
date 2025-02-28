FROM node:20-alpine AS angular
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
#ndopane mari yese
COPY --from=angular /app/dist/frontend/browser/ /usr/share/nginx/html
EXPOSE 80
