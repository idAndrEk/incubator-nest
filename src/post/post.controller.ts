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

@Controller("posts")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postQueryRepository: PostsQueryRepository
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPosts(@Query() queryParams: getPostQueryParams, @Req() user: UserViewResponse) {
    try {
      return this.postQueryRepository.getPosts(user, queryParams);
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getPost(@Param("id") id: ObjectId, @Req() user: UserViewResponse) {
    try {
      return this.postQueryRepository.getPost(id, user);
    } catch (error) {
      console.log(error);
      return ("Error");
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() createPostDto: postDto) {
    try {

      return this.postService.createNewPost(createPostDto.title, createPostDto.shortDescription, createPostDto.content, createPostDto.blogId);
    } catch (error) {
      console.log(error);
      return ("Error");
    }
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

