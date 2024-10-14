# Vite Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the Vite app
RUN npm run build

RUN ls -l dist

# Serve Vite app with a static file server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]