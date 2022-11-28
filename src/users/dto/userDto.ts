import { IsEmail, IsString, Length, Matches } from "class-validator";

export class userDto {
  @IsString()
  @Length(3,10)
  @Matches('^[a-zA-Z0-9_-]*$')
  login

  @IsString()
  @Length(6,20)
  password

  @IsString()
  @IsEmail()
  email
}