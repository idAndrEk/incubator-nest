import { IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../ utilities/query/PaginationDto';
import { SortDto } from '../../ utilities/query/SortDto';

export class GetBlogsQueryParams extends IntersectionType(
  PaginationDto,
  SortDto,
) {
  @IsOptional()
  @IsString()
  searchNameTerm: string | null = null;
}
