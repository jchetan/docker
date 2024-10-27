FROM node:14-alpine
WORKDIR /app

COPY package.json .
RUN npm install
RUN npm install -g pm2
COPY . .

CMD ["pm2-runtime", "index.js"]