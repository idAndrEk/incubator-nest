import { Injectable } from '@nestjs/common';
import { BlogsViewType, CreateBlogs } from './types/blogsType';
import { BlogsRepository } from './blogs.repository';
import { blogDto } from './dto/blogDto';
import { ObjectId } from 'mongodb';

@Injectable()
export class BlogsService {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  async createNewBlog({
    name,
    description,
    websiteUrl,
  }: blogDto): Promise<BlogsViewType | null> {
    const newBlogger: CreateBlogs = {
      name: name,
      description: description,
      websiteUrl: websiteUrl,
      createdAt: new Date(),
    };
    const createdBlog = await this.blogsRepository.create(newBlogger);
    if (createdBlog)
      return {
        id: createdBlog._id.toString(),
        name: createdBlog.name,
        description: createdBlog.description,
        websiteUrl: createdBlog.websiteUrl,
        createdAt: createdBlog.createdAt,
      };
    return null;
  }

  async updateBlog(
    id: ObjectId,
    { name, description, websiteUrl }: blogDto,
  ): Promise<boolean> {
    return this.blogsRepository.updateBlog(id, name, description, websiteUrl);
  }

  async deleteBlog(id: ObjectId): Promise<boolean> {
    return this.blogsRepository.deleteBlog(id);
  }
}
