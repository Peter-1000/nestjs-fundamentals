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
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './user.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {
  }

  @Get()
  get() {
    return this.UsersService.getAllUsers();
  }

  @Get(':id')
  find(@Param('id', ParseUUIDPipe)id) {
    return this.UsersService.getUserById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.createUser(createUserDto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe)id: string, @Body()updateUserDto: UpdateUserDto) {
    return this.UsersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe)id): void {
    this.UsersService.deleteUser(id);
  }
}