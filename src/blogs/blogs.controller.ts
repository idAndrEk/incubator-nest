import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { SortDirection } from '../enums';
import { BlogsQueryRepository } from './blogs.query-repository';

@Controller('blogs')
export class BlogsController {
  constructor(protected blogsQueryRepository: BlogsQueryRepository) {}

  @Get()
  getAllBlogs(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('searchNameTerm') searchNameTerm: string | null,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: SortDirection,
  ) {
    const getBlogs = this.blogsQueryRepository.getAll(
      +page || 1,
      +pageSize || 10,
      searchNameTerm ? searchNameTerm.toString() : null,
      sortBy ?? 'createdAt',
      sortDirection === 'asc' ? SortDirection.Asc : SortDirection.Desc,
    );
    return getBlogs;
  }
}
