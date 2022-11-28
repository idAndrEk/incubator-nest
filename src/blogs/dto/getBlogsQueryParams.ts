import {
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsEnum,
} from 'class-validator';
import { SortDirection } from '../../enums';

export class getBlogsQueryParams {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  pageSize;
  // pageSize = 10;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  pageNumber;
  // pageNumber = 1;

  @IsOptional()
  @IsString()
  searchNameTerm;
  // searchNameTerm: string | null = null;

  @IsOptional()
  sortBy;
  // sortBy = 'createdAt';

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection;
  // sortDirection: SortDirection = SortDirection.desc;
}
