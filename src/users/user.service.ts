import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User {
    const user: User = { ...createUserDto, id: randomUUID() };
    this.users.push(user);
    return user;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): User {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user['id'] !== id);
  }
}