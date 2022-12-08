import { Inject, Injectable } from "@nestjs/common";
import { blogDto } from './dto/blogDto';
import { BlogsType } from './types/blogsType';
import { ObjectId } from 'mongodb';
import { Model } from "mongoose";

@Injectable()
export class BlogsRepository {
  constructor(@Inject("BLOG_MODEL") private readonly blogModel: Model<BlogsType>) {
  }
  async create(newBlogger: blogDto): Promise<BlogsType | null> {
    try {
      const blog = new this.blogModel(newBlogger);
      await blog.save();
      return blog;
    } catch (e) {
      return null;
    }
  }

  async updateBlog(
    id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string,
  ): Promise<boolean> {
    const updateResult = await this.blogModel.findByIdAndUpdate(id, {
      name,
      description,
      websiteUrl,
    });
    if (updateResult) return true;
    return false;
    // return updateResult.modifiedCount === 1;
  }

  async deleteBlog(id: ObjectId): Promise<boolean> {
    const deleteResult = await this.blogModel.findByIdAndDelete(id);
    if (deleteResult) return true;
    return false;
    // return deleteResult.deletedCount === 1;
  }
}
