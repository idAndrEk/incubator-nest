import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { BlogsQueryRepository } from './blogs.query-repository';
import { GetBlogsQueryParams } from './dto/GetBlogsQueryParams';

@Controller('blogs')
export class BlogsController {
  constructor(protected blogsQueryRepository: BlogsQueryRepository) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBlogs(@Query() queryParams: GetBlogsQueryParams) {
    return this.blogsQueryRepository.getAll(queryParams);
  }
}

//
// async getAllBlogs(@Query() searchParams: GetAllBlogsSearchParamsDto) {
//   return this.blogsQueryRepository.getAll(searchParams);
// }
