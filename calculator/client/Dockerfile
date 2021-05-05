FROM node:12.18.3

WORKDIR /usr/app

COPY package*.json /app/

RUN npm install  --quiet
COPY . .

EXPOSE 3000

CMD ["npm", "start"]