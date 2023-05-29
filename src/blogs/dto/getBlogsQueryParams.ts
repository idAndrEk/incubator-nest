import {
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  IsString,
} from 'class-validator';

export class getBlogsQueryParams {
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
  @IsString()
  searchNameTerm;

  @IsOptional()
  sortBy;

  @IsOptional()
  sortDirection;
}
