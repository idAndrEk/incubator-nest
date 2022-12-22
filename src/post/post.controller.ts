import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req
} from "@nestjs/common";
import { getPostQueryParams } from "./dto/getPostQueryParams";
import { ObjectId } from "mongodb";
import { postDto } from "./dto/postDro";
import { PostService } from "./post.service";
import { PostsQueryRepository } from "./post.query-repository";
import { UserViewResponse } from "../users/types/usersType";
import { BlogsQueryRepository } from "../blogs/blogs.query-repository";

@Controller("posts")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postQueryRepository: PostsQueryRepository,
    private readonly blogsQueryRepository: BlogsQueryRepository
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPosts(@Query() queryParams: getPostQueryParams, @Req() user: UserViewResponse) {
    return this.postQueryRepository.getPosts(user, queryParams);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getPost(@Param("id") id: ObjectId, @Req() user: UserViewResponse) {
    return this.postQueryRepository.getPost(id, user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() createPostDto: postDto) {
    // const blogById = await this.blogsQueryRepository.getBlog(createPostDto.blogId);
    const createPost = await this.postService.createNewPost(createPostDto.title, createPostDto.content, createPostDto.blogId, createPostDto.shortDescription);
    if (!createPost) {
      throw new NotFoundException("Blog not found");
    }
    return createPost;
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async updatePostById(
    @Param("id") id: ObjectId, @Body() updatePostDto: postDto) {
    try {
      const updateResult = await this.postService.updatePost(id, updatePostDto);
      if (!updateResult) throw new NotFoundException("post does not exist!");
      return updateResult;
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }

  @Delete("id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePostById(@Param("id") id: ObjectId) {
    try {
      const deleteResult = await this.postService.deletePost(id);
      if (!deleteResult) throw new NotFoundException("Post does not exist");
      return;
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }
}

