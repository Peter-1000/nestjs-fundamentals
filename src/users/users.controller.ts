import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './user.service';
import { APP_NAME } from './user.constants';
import { UserResponseDto } from './dtos/user-response.dto';
import { User } from './user';
import { Public } from '../common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  PORT: number,
  EMAIL: string,
}

@Controller('/users')
export class UsersController {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly usersService: UsersService,
    @Inject(APP_NAME) private readonly appName: string,
  ) {
    console.log(this.configService.get('EMAIL', { infer: true }));
  }

  // @SetMetadata('IS_PUBLIC', true)
  @Public()
  @Get()
  get(): User[] {
    return this.usersService.getAllUsers();
  }

  @Public()
  @Get(':id')
  find(@Param('id', ParseUUIDPipe) id): UserResponseDto {
    return this.usersService.getUserById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserResponseDto {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserResponseDto {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id): void {
    this.usersService.deleteUser(id);
  }
}
