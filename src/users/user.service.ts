import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomUUID } from 'crypto';
import { UserResponseDto } from './dtos/user-response.dto';
import { CustomException } from 'src/common/exceptions/custom-exception';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): UserResponseDto {
    const user: User | undefined = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return new UserResponseDto(user);
  }

  createUser(createUserDto: CreateUserDto): UserResponseDto {
    const newUser: User = { ...createUserDto, id: randomUUID() };
    this.users.push(newUser);
    return new UserResponseDto(newUser);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): UserResponseDto {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new CustomException(`User with id ${id} not found`);
    }    
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return new UserResponseDto(this.users[index]);
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user['id'] !== id);
  }
}
