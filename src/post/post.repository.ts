import { Inject, Injectable } from "@nestjs/common";
import { CreatePostDto, PostsType } from "./types/postsType";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";

@Injectable()
export class PostRepository {
  constructor(@Inject("POST_MODEL") private readonly postModel: Model<PostsType>) {
  }

  async createPost(newPost: CreatePostDto): Promise<PostsType | null> {
    try {
      const post = new this.postModel(newPost);
      await post.save();
      return post;
    } catch (e) {
      return null;
    }
  }

  async updatePost(id: ObjectId, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
    const updateResult = await this.postModel.findByIdAndUpdate(id, {
      title,
      shortDescription,
      content,
      blogId
    });
    if (updateResult) return true;
    return false;
  }

  async deletePost(id: ObjectId): Promise<boolean> {
    const deleteResult = await this.postModel.findByIdAndDelete(id);
    if (deleteResult) return true;
    return false;
  }
}
