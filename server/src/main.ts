import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

const port = process.env.PORT;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    maxAge: 7200,
    origin: ["http://localhost:3006","http://localhost:5000"], //JSON.parse(process.env.CORS_ORIGIN),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
    exposedHeaders: ['AUTHORIZATION', 'X-REQUEST-ID'],
  });
  
  await app.listen(process.env.PORT);

  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
 