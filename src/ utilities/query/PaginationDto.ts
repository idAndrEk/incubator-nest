import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize = 10;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageNumber = 1;
}
