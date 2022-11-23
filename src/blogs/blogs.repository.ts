import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/createBlogDto';
import { BlogsModel } from './blogs.schema';
import { BlogsType } from './type/blogsType';

@Injectable()
export class BlogsRepository {
  async create(newBlogger: CreateBlogDto): Promise<BlogsType | null> {
    try {
      const bloggerInstance = new BlogsModel(newBlogger);
      await bloggerInstance.save();
      return bloggerInstance;
    } catch (e) {
      return null;
    }
  }
}
//
// async create({
//   name,
//   description,
//   websiteUrl,
// }: CreateBlogDto): Promise<BlogsType> {
//   try {
//     const bloggerInstance = new BlogsModel(CreateBlogDto);
//     await bloggerInstance.save();
//     return bloggerInstance;
//   } catch (e) {
//     return null;
//   }
