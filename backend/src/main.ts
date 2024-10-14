import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with credentials support
  app.enableCors({
    origin: process.env.FRONTEND_CORS_ORIGIN,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
