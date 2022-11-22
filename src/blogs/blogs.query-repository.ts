import { Injectable } from '@nestjs/common';
import { PaginationBlogsType } from '../type/blogsType';
import { SortDirection } from '../enums';
import { BlogsModel } from './blogs.schema';

@Injectable()
export class BlogsQueryRepository {
  async getAll(
    page: number,
    pageSize: number,
    searchNameTerm: string | null,
    sortBy: string,
    sortDirection: SortDirection,
  ): Promise<PaginationBlogsType> {
    let filter = {};
    if (searchNameTerm) {
      filter = { name: { $regex: { searchNameTerm } } };
    }
    const findBlogs = await BlogsModel.find(filter)
      .skip((page - 1) * pageSize)
      .sort({ [sortBy]: sortDirection === SortDirection.Asc ? 1 : -1 })
      .limit(pageSize)
      .lean();
    const totalCount = await BlogsModel.countDocuments(filter);
    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      items: findBlogs.map((findBlogs) => ({
        id: findBlogs._id.toString(),
        name: findBlogs.name,
        youtubeUrl: findBlogs.youtubeUrl,
        createdAt: new Date(),
      })),
    };
  }
}
