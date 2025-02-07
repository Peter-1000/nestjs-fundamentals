import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  age: number;
  @Expose({ name: 'string_age' })
  get stringAge(): string {
    return this.age + ' years old';
  }

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
