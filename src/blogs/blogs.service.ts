import { Injectable } from '@nestjs/common';
import { BlogsType, BlogsViewType, CreateBlogs } from './type/blogsType';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './dto/createBlogDto';

@Injectable()
export class BlogsService {
  constructor(protected blogsRepository: BlogsRepository) {}

  // async createNewBlog(
  //   name: string,
  //   description: string,
  //   websiteUrl: string,
  // ): Promise<BlogsViewType | null> {
  //   const newBlogger: CreateBlogs = {
  //     name: name,
  //     description: description,
  //     websiteUrl: websiteUrl,
  //     createdAt: new Date(),
  //   };
  //   const createdBlog = await this.blogsRepository.create(newBlogger);
  //   if (createdBlog)
  //     return {
  //       id: createdBlog._id.toString(),
  //       name: createdBlog.name,
  //       description: createdBlog.description,
  //       websiteUrl: createdBlog.websiteUrl,
  //       createdAt: createdBlog.createdAt,
  //     };
  //   return null;
  // }
  async createNewBlog({
    name,
    description,
    websiteUrl,
  }: CreateBlogDto): Promise<BlogsType> {
    return this.blogsRepository.create({ name, description, websiteUrl });
  }
}
