import { Injectable } from '@nestjs/common';
import { CreateUpdateBlogDto } from './dto/createUpdateBlogDto';
import { BlogsModel } from './blogs.schema';
import { BlogsType } from './type/blogsType';
import { ObjectId } from 'mongodb';

@Injectable()
export class BlogsRepository {
  async create(newBlogger: CreateUpdateBlogDto): Promise<BlogsType | null> {
    try {
      const bloggerInstance = new BlogsModel(newBlogger);
      await bloggerInstance.save();
      return bloggerInstance;
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
    const updateResult = await BlogsModel.findByIdAndUpdate(id, {
      name,
      description,
      websiteUrl,
    });
    if (updateResult) return true;
    return false;
    // return updateResult.modifiedCount === 1;
  }

  async deleteBlog(id: ObjectId): Promise<boolean> {
    const deleteResult = await BlogsModel.findByIdAndDelete(id);
    if (deleteResult) return true;
    return false;
    // return deleteResult.deletedCount === 1;
  }
}
