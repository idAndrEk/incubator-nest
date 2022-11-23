import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { BlogsQueryRepository } from './blogs.query-repository';
import { GetBlogsQueryParams } from './dto/getBlogsQueryParams';
import { CreateBlogDto } from './dto/createBlogDto';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(
    protected blogsQueryRepository: BlogsQueryRepository,
    protected blogsService: BlogsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBlogs(@Query() queryParams: GetBlogsQueryParams) {
    return this.blogsQueryRepository.getAll(queryParams);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.createNewBlog(createBlogDto);
  }
}
