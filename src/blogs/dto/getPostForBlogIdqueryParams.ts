import {
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsEnum,
} from 'class-validator';
import { SortDirection } from '../../enums';

export class getPostForBlogerIdQueryParams {
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
  sortDirection;
}
