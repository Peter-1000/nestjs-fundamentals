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
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './user.service';
import { APP_NAME } from './user.constants';
import { UserResponseDto } from './dtos/user-response.dto';
import { User } from './user';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(APP_NAME) private readonly appName: string,
  ) {}

  @Get()
  get(): User[] {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  find(@Param('id', ParseUUIDPipe) id): UserResponseDto {
    return this.usersService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): UserResponseDto {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
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
