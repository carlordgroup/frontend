FROM node:16-buster

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD npm run build
