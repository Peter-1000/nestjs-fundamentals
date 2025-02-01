import { IsEmail, IsInt, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20, { message: 'Invalid username length' })
  readonly username: string;

  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsInt()
  readonly age: number;
}