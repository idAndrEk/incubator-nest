import { Controller, Delete, HttpCode, HttpStatus, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { BlogsType } from "../blogs/types/blogsType";
import { PostsType } from "../post/types/postsType";

@Controller("testing")

export class TestingController {
  constructor(@Inject("BLOG_MODEL") private readonly blogModel: Model<BlogsType>,
              @Inject("POST_MODEL") private readonly postModel: Model<PostsType>) {
  }

  @Delete("/all-data")
  @HttpCode(HttpStatus.NO_CONTENT)
  async() {
    this.blogModel.deleteMany({});
    this.postModel.deleteMany({});
    return;
  }
}
