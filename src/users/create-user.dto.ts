import { IsEmail, IsInt, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsInt()
  readonly age: number;
}