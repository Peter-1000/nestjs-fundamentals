import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';

@Controller('/users')
export class UsersController {
  @Get()
  get(): string[] {
    return ['User one', 'User two', 'User three'];
  }

  @Get('/find')
  find(): string {
    return 'User one';
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe)id: number): string {
    return 'User have been updated';
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe)id: number): string {
    return 'User have been deleted';
  }
}