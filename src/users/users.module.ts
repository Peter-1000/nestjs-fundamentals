import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './user.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'APP_NAME',
      useValue: 'Users API',
    },
  ],
})
export class UserModule {}
