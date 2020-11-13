FROM node:15.2.0
WORKDIR /backend
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn", "start"] 
