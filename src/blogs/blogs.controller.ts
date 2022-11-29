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
  Query, Req
} from "@nestjs/common";
import { BlogsQueryRepository } from "./blogs.query-repository";
import { getBlogsQueryParams } from "./dto/getBlogsQueryParams";
import { blogDto } from "./dto/blogDto";
import { BlogsService } from "./blogs.service";
import { ObjectId } from "mongodb";
import { getPostForBlogerIdQueryParams } from "./dto/getPostForBlogIdqueryParams";
import { UserViewResponse } from "../users/types/usersType";
import { postForBlogDto } from "./dto/postForBlogDto";
import { PostService } from "../post/post.service";

@Controller("blogs")
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly blogsQueryRepository: BlogsQueryRepository,
    protected postsService: PostService
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBlogs(@Query() queryParams: getBlogsQueryParams) {
    return await this.blogsQueryRepository.getAll(queryParams);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getBlog(@Param("id") id: ObjectId) {
    return await this.blogsQueryRepository.getBlog(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() createBlogDto: blogDto) {
    return await this.blogsService.createNewBlog(createBlogDto);
  }

  @Get(":id/posts")
  @HttpCode(HttpStatus.OK)
  async getPostForBlog(@Param(":id") id: ObjectId,
                       @Query() queryParams: getPostForBlogerIdQueryParams,
                       @Req() user: UserViewResponse) {
    const blogById = await this.blogsQueryRepository.getBlog(id);
    if (blogById) return await this.blogsQueryRepository.getPostByBlogId(id, queryParams, user);
  }

  @Post(":id/posts")
  @HttpCode(HttpStatus.CREATED)
  async createPostForBlog(@Param("id") id: ObjectId,
                          @Body() queryParams: postForBlogDto) {
    return await this.postsService.createNewPost(id.toString(), queryParams.title, queryParams.shortDescription, queryParams.content);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async updateBlogById(
    @Param("id") id: ObjectId,
    @Body() updateBlogDto: blogDto
  ) {
    const updateResult = await this.blogsService.updateBlog(id, updateBlogDto);
    if (!updateBlogDto) throw new NotFoundException("Blog does not exist!");
    return updateResult;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlogById(@Param("id") id: ObjectId) {
    const deleteResult = await this.blogsService.deleteBlog(id);
    if (!deleteResult) throw new NotFoundException("Blog does not exist");
    return;
  }


}
