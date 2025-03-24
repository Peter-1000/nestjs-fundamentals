import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { WrapDataInterceptor } from './common/interceptors/wrap-data.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { CustomExceptionFilter } from './common/filters/custom-exception/custom-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use(LoggerMiddleware); // for global middleware

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());

  app.useGlobalInterceptors(
    new WrapDataInterceptor(),
    new TimeoutInterceptor(),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
