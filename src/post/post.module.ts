import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "./post.schema";
import { PostsQueryRepository } from "./post.query-repository";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'posts', schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService,PostsQueryRepository, PostRepository],
  exports: [],
})
export class PostModule {}
