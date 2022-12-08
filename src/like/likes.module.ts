import { Module } from "@nestjs/common";
import { LikesRepository } from "./likesRepository";
import { DatabaseModule } from "../database/database.module";
import { likesProviders } from "./likes.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...likesProviders,LikesRepository],
  exports: []
})
export class LikesModule {
}
