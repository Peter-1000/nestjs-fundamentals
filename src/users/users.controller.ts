import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('/users')
export class UserController {
  @Get()
  get(): string[] {
    return ['User one', 'User two', 'User three'];
  }

  @Get('/find')
  find(): string {
    return 'User one';
  }

  @Post()
  create(): string {
    return 'User have been added';
  }

  @Patch()
  update(): string {
    return 'User have been updated';
  }

  @Delete()
  delete(): string {
    return 'User have been deleted';
  }
}