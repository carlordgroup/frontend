FROM node:16-buster AS build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM joseluisq/static-web-server:latest

COPY --from=build /app/build /app/build
CMD ["-p","8787","-d","/app/build", "--page-fallback", "/app/build/index.html"]
