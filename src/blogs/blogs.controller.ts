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
  Query, Req, Res,
  HttpException
} from "@nestjs/common";
import { Response } from "express";
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
    try {
      return await this.blogsQueryRepository.getBlogs(queryParams);
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getBlog(@Param("id") id: ObjectId) {
    try {
      return await this.blogsQueryRepository.getBlog(id);
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() createBlogDto: blogDto) {
    try {
      return await this.blogsService.createNewBlog(createBlogDto);
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }

  @Get(":id/posts")
  @HttpCode(HttpStatus.OK)
  async getPostForBlog(@Param(":id") id: ObjectId,
                       @Query() queryParams: getPostForBlogerIdQueryParams,
                       @Req() user: UserViewResponse) {
    try {
      const blogById = await this.blogsQueryRepository.getBlog(id);
      if (blogById) return await this.blogsQueryRepository.getPostByBlogId(id, queryParams, user);
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }

  @Post(":id/posts")
  @HttpCode(HttpStatus.CREATED)
  async createPostForBlog(@Param("id") id: ObjectId,
                          @Body() queryParams: postForBlogDto,
                          @Res() res: Response) {
    try {
      const newPostForBlogId = await this.postsService.createNewPost(id, queryParams.title, queryParams.shortDescription, queryParams.content);
      // if (!newPostForBlogId) throw new HttpException("blogId", HttpStatus.NO_CONTENT);
      if (newPostForBlogId) return res.sendStatus(204).send(newPostForBlogId);
      const errors = [];
      errors.push({ message: "Error blogId", field: "blogId" });
      if (errors.length) {
        res.status(404).json({
          errorsMessages: errors
        });
        return;
      }
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async updateBlogById(
    @Param("id") id: ObjectId,
    @Body() updateBlogDto: blogDto
  ) {
    try {
      const updateResult = await this.blogsService.updateBlog(id, updateBlogDto);
      if (!updateBlogDto) throw new NotFoundException("Blog does not exist!");
      return updateResult;
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlogById(@Param("id") id: ObjectId) {
    try {
      const deleteResult = await this.blogsService.deleteBlog(id);
      if (!deleteResult) throw new NotFoundException("Blog does not exist");
      return;
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }
}
