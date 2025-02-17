import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
