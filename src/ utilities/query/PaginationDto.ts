import { IsInt, IsOptional, Min, IsNumber } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  pageSize = 10;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  pageNumber = 1;
}
