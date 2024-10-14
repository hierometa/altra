# NestJS Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY prisma ./prisma

COPY . .

# RUN npx prisma generate

# Build the NestJS app
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]