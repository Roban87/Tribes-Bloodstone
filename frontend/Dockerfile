FROM node:14.11.0
WORKDIR /frontend
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]