import { Injectable } from "@nestjs/common";
import { postDto } from "./dto/postDro";
import { CreatePostDto, PostViewType } from "./types/postsType";
import { BlogsQueryRepository } from "../blogs/blogs.query-repository";
import { PostRepository } from "./post.repository";
import { ObjectId } from "mongodb";

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository,
              private readonly blogsQueryRepository: BlogsQueryRepository) {
  }

  async createNewPost(blogId: ObjectId, title: string, shortDescription: string, content: string): Promise<PostViewType | null> {
    const blogger = await this.blogsQueryRepository.getBlog(blogId);
    if (!blogger) return null;
    const newPost: CreatePostDto = {
      title,
      bloggerName: blogger.name,
      shortDescription,
      content,
      blogId,
      createdAt: new Date(),
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: "None",
        newestLikes: []
      }
    };
    const createdPost = await this.postRepository.createPost(newPost);
    if (createdPost) return {
      id: createdPost._id,
      title: createdPost.title,
      bloggerName: createdPost.bloggerName,
      shortDescription: createdPost.shortDescription,
      content: createdPost.content,
      blogId: createdPost.blogId,
      createdAt: createdPost.createdAt,
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: "None",
        newestLikes: []
      }
    };
    return null;
  }

  async updatePost(id: ObjectId, { title, shortDescription, content, blogId }: postDto): Promise<boolean | null> {
    return await this.postRepository.updatePost(id, title, shortDescription, content, blogId);
  }

  async deletePost(id: ObjectId): Promise<boolean> {
    return await this.postRepository.deletePost(id);
  }
}
