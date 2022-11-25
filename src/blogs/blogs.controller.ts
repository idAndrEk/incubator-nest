import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogsQueryRepository } from './blogs.query-repository';
import { GetBlogsQueryParams } from './dto/getBlogsQueryParams';
import { CreateUpdateBlogDto } from './dto/createUpdateBlogDto';
import { BlogsService } from './blogs.service';
import { ObjectId } from 'mongodb';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsQueryRepository: BlogsQueryRepository,
    private readonly blogsService: BlogsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBlogs(@Query() queryParams: GetBlogsQueryParams) {
    return this.blogsQueryRepository.getAll(queryParams);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() createBlogDto: CreateUpdateBlogDto) {
    return this.blogsService.createNewBlog(createBlogDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBlog(
    @Param('id') blogsId: ObjectId,
    @Body() updateBlogDto: CreateUpdateBlogDto,
  ) {
    return this.blogsService.updateBlog(blogsId, updateBlogDto);
  }
}
