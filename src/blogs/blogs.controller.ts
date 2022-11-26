import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBlog(@Param('id') id: ObjectId) {
    return this.blogsQueryRepository.getBlog(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() createBlogDto: CreateUpdateBlogDto) {
    return this.blogsService.createNewBlog(createBlogDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateBlogById(
    @Body() updateBlogDto: CreateUpdateBlogDto,
    @Param('id') id: ObjectId,
  ) {
    const updateResult = this.blogsService.updateBlog(id, updateBlogDto);
    if (!updateBlogDto) throw new NotFoundException('Blog does not exist!');
    return updateResult;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlogById(@Param('id') id: ObjectId) {
    const deleteResult = await this.blogsService.deleteBlog(id);
    if (!deleteResult) throw new NotFoundException('Blog does not exist');
    return;
  }
}
