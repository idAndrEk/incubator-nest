import { IsEnum, IsInt, IsNumber, IsOptional, Min } from "class-validator";
import { SortDirection } from "../../enums";

export class getPostQueryParams {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  pageSize;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  pageNumber;

  @IsOptional()
  sortBy;

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection;
}