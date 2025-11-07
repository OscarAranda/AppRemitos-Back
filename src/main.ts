// Load environment variables early so entity files that read process.env
// see the correct values (this ensures table/schema names from .env are used)
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global validation pipe: transforms and strips unknown properties
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: false }),
  );
  // Enable CORS for frontend (configurable)
  const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:4200';
  app.enableCors({
    origin: frontendOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
