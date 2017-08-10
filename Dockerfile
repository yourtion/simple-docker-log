FROM node:6-alpine

WORKDIR /app
EXPOSE 514

COPY package.json /app/
RUN npm install && npm cache clean --force
COPY *.js /app

CMD [ "npm", "start" ]
