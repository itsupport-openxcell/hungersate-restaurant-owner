FROM node:20-alpine
RUN apk add --no-cache git
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build
RUN npm install -g serve 
EXPOSE 3000
CMD ["serve", "-s", "out", "-l", "3000"]