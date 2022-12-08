import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { commentProviders } from "./comment.providers";
import { CommentsController } from "./commet.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [...commentProviders, ],
  exports: []
})
export class CommentModule {
}
