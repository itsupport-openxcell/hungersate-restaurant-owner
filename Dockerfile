FROM node:20-alpine
RUN apk add --no-cache git
WORKDIR /app
COPY . .
RUN npm install --force 
RUN npm run build
EXPOSE 3000
CMD npm run start
