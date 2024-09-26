FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm update

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
