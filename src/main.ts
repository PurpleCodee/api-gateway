// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const cfg = app.get(ConfigService);
//   await app.listen(Number(cfg.get('PORT') ?? 3000));
// }
// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4201'],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  });

  const cfg = app.get(ConfigService);
  await app.listen(Number(cfg.get('PORT') ?? 3000));
}
bootstrap();
