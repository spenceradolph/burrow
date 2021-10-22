FROM node:12 AS build
WORKDIR /app
COPY package* ./
RUN npm install
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html