import { IsString, Length } from "class-validator";

export class commentDto {
  @IsString()
  @Length(20, 300)
  content
}
