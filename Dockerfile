FROM node:16

WORKDIR /usr/src/app

ENV PORT 8080

COPY package*.json ./

RUN yarn install --only=production
COPY . .
RUN yarn build

# RUN npm run build

CMD yarn start