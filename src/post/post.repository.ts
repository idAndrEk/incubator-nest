import { Injectable } from "@nestjs/common";
import { CreatePostDto, PostsType } from "./types/postsType";
import { PostModel } from "./post.schema";
import { ObjectId } from "mongodb";

@Injectable()
export class PostRepository {

  async createPost(newPost: CreatePostDto): Promise<PostsType | null> {
    try {
      const post = new PostModel(newPost);
      await post.save();
      return post;
    } catch (e) {
      return null;
    }
  }

  async updatePost(id: ObjectId, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
    const updateResult = await PostModel.findByIdAndUpdate(id, {
      title,
      shortDescription,
      content,
      blogId
    })
    if (updateResult) return true
    return false
  }

  async deletePost(id: ObjectId): Promise<boolean> {
    const deleteResult = await PostModel.findByIdAndDelete(id)
    if (deleteResult) return true
    return false
  }
}