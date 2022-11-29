import { Injectable } from '@nestjs/common';
import { blogDto } from './dto/blogDto';
import { BlogModel } from './blogs.schema';
import { BlogsType } from './types/blogsType';
import { ObjectId } from 'mongodb';

@Injectable()
export class BlogsRepository {
  async create(newBlogger: blogDto): Promise<BlogsType | null> {
    try {
      const blog = new BlogModel(newBlogger);
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
    const updateResult = await BlogModel.findByIdAndUpdate(id, {
      name,
      description,
      websiteUrl,
    });
    if (updateResult) return true;
    return false;
    // return updateResult.modifiedCount === 1;
  }

  async deleteBlog(id: ObjectId): Promise<boolean> {
    const deleteResult = await BlogModel.findByIdAndDelete(id);
    if (deleteResult) return true;
    return false;
    // return deleteResult.deletedCount === 1;
  }
}
