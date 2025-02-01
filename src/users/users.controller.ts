import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post, Query,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserPipe } from './pipes/user.pipe';

@Controller('/users')
export class UsersController {
  private users: any[] = [];

  @Get()
  get(@Query("username", UserPipe) username: string) {
    console.log(username);
    return this.users;
  }

  @Get(':id')
  find(@Param('id', ParseUUIDPipe)id) {
    return this.users.find((user) => user['id'] === id) ?? 'User is not found';
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = createUserDto;
    user['id'] = randomUUID();
    this.users.push(user);
    return user;
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe)id: string, @Body()updateUserDto: UpdateUserDto) {
    let user = this.users.find((user) => user['id'] === id);
    if (user) {
      user.username = updateUserDto.username ?? user.username;
      user.email = updateUserDto.email ?? user.email;
      user.age = updateUserDto.age ?? user.age;
    }
    return user ?? 'User not found';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe)id): void {
    this.users = this.users.filter((user) => user['id'] !== id);
  }
}