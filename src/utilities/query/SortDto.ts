import { SortDirection } from '../../enums';
import { IsOptional, IsEnum } from 'class-validator';

export class SortDto {
  @IsOptional()
  sortBy = 'createdAt';

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.desc;
}
