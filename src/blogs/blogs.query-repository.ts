import { Injectable } from '@nestjs/common';
import { PaginationBlogsType } from './type/blogsType';
import { SortDirection } from '../enums';
import { BlogsModel } from './blogs.schema';
import { GetBlogsQueryParams } from './dto/getBlogsQueryParams';
import { getCountPage, getSkipPage } from '../ utilities/getPage';

@Injectable()
export class BlogsQueryRepository {
  async getAll({
    pageNumber = 1,
    pageSize = 10,
    searchNameTerm = null,
    sortDirection = SortDirection.desc,
    sortBy = 'createdAt',
  }: GetBlogsQueryParams): Promise<PaginationBlogsType> {
    // let filter = {};
    // if (searchNameTerm) {
    //   filter = { name: { $regex: { searchNameTerm } } };
    // }
    const findBlogs = await BlogsModel.find({
      $or: [{ name: { $regex: searchNameTerm ?? '', $options: 'i' } }],
    })
      .skip(getSkipPage(pageNumber, pageSize))
      .sort({ [sortBy]: sortDirection === SortDirection.asc ? 1 : -1 })
      .limit(pageSize)
      .lean();
    const totalCount = await BlogsModel.countDocuments({
      $or: [{ name: { $regex: searchNameTerm ?? '', $options: 'i' } }],
    });
    return {
      pagesCount: getCountPage(totalCount, pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items: findBlogs.map((findBlogs) => ({
        id: findBlogs._id.toString(),
        name: findBlogs.name,
        description: findBlogs.description,
        websiteUrl: findBlogs.websiteUrl,
        createdAt: new Date(),
      })),
    };
  }
}
