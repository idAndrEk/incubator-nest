import { Module } from "@nestjs/common";
import { PostsQueryRepository } from "./post.query-repository";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";
import { BlogsQueryRepository } from "../blogs/blogs.query-repository";
import { LikesRepository } from "../like/likesRepository";
import { postsProviders } from "./post.providers";
import { DatabaseModule } from "../database/database.module";
import { blogsProviders } from "../blogs/blogs.providers";
import { likesProviders } from "../like/likes.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [...postsProviders, PostService, PostsQueryRepository, PostRepository,...blogsProviders, BlogsQueryRepository, ...likesProviders,LikesRepository],
  exports: []
})
export class PostModule {
}
