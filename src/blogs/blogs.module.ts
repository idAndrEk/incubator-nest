import { Module } from "@nestjs/common";
import { BlogsController } from "./blogs.controller";
import { BlogsService } from "./blogs.service";
import { BlogsRepository } from "./blogs.repository";
import { BlogsQueryRepository } from "./blogs.query-repository";
import { LikesRepository } from "../like/likesRepository";
import { PostService } from "../post/post.service";
import { PostRepository } from "../post/post.repository";
import { DatabaseModule } from "../database/database.module";
import { blogsProviders } from "./blogs.providers";
import { postsProviders } from "../post/post.providers";
import { likesProviders } from "../like/likes.providers";
import { TestingController } from "../testing/testing-router";

@Module({
  imports: [DatabaseModule],
  controllers: [BlogsController,TestingController],
  providers: [...blogsProviders,BlogsService, BlogsRepository, BlogsQueryRepository, ...postsProviders,PostService, PostRepository, ...likesProviders,LikesRepository],
  exports: []
})
export class BlogsModule {
}
