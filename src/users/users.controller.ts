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
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './user.service';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('APP_NAME') private readonly appName: string,
  ) {}

  @Get()
  get() {
    console.log(this.appName);
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  find(@Param('id', ParseUUIDPipe) id) {
    return this.usersService.getUserById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id): void {
    this.usersService.deleteUser(id);
  }
}
