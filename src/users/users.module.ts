import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './user.service';
import { APP_NAME } from './user.constants';

abstract class ConfigClass {}
class DevelopmentConfig extends ConfigClass {}
class ProductionConfig extends ConfigClass {}

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_NAME,
      useValue: 'Users API',
    },
    {
      provide: ConfigClass,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfig
          : ProductionConfig,
    },
  ],
})
export class UserModule {}
