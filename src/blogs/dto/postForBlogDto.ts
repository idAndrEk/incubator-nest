import { IsString, Length } from "class-validator";

export class postForBlogDto {
  @IsString()
  @Length(1, 30)
  title

  @IsString()
  @Length(1, 100)
  shortDescription

  @IsString()
  @Length(1, 1000)
  content
}