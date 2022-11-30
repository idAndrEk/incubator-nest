import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogsSchema } from "./blogs.schema";
import { BlogsController } from "./blogs.controller";
import { BlogsService } from "./blogs.service";
import { BlogsRepository } from "./blogs.repository";
import { BlogsQueryRepository } from "./blogs.query-repository";
import { LikesRepository } from "../like/likesRepository";
import { PostService } from "../post/post.service";
import { PostRepository } from "../post/post.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "blogs", schema: BlogsSchema }])
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsRepository, BlogsQueryRepository, PostService, PostRepository, LikesRepository],
  exports: []
})
export class BlogsModule {
}
