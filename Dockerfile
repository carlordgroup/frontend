FROM node:16-buster AS build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM joseluisq/static-web-server:latest

COPY --from=build /app/build /app/build
<<<<<<< HEAD
CMD ["-p","8787","-d","/app/build", "--page-fallback", "/app/build/index.html"]
=======
CMD ["-p","8787","-d","/app/build"]
>>>>>>> a2e1b12eb763532d4cc189c525fbb37e19a14a14
