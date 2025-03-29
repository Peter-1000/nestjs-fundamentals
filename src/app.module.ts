import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : '.staging.env',
      isGlobal: true,
      expandVariables: true,
    }),

    // TypeOrmModule.forRootAsync({
    //   useFactory: ormConfig,
    // }),

    UserModule,
    CommonModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'users/:id',
          method: RequestMethod.PUT,
        },
        {
          path: 'users/:id',
          method: RequestMethod.DELETE,
        },
      )
      .forRoutes('*');
  }
}
