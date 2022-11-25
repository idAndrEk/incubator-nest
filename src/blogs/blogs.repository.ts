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
    blogsId: ObjectId,
    { name, description, websiteUrl }: CreateUpdateBlogDto,
  ): Promise<boolean> {
    const updateResult = await BlogsModel.updateOne(
      { id: blogsId },
      {
        name,
        description,
        websiteUrl,
      },
    );
    if (updateResult) return true;
    return false;
  }
}
