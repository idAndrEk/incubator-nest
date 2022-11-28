import { Injectable } from "@nestjs/common";
import { BlogsViewType, PaginationBlogsType } from "./types/blogsType";
import { SortDirection } from "../enums";
import { BlogModel } from "./blogs.schema";
import { getBlogsQueryParams } from "./dto/getBlogsQueryParams";
import { getCountPage, getSkipPage } from "../ utilities/getPage";
import { ObjectId } from "mongodb";

@Injectable()
export class BlogsQueryRepository {

  async getAll({
                 pageNumber = 1,
                 pageSize = 10,
                 searchNameTerm = null,
                 sortDirection = SortDirection.desc,
                 sortBy = "createdAt"
               }: getBlogsQueryParams): Promise<PaginationBlogsType> {
    const findBlogs = await BlogModel.find({
      $or: [{ name: { $regex: searchNameTerm ?? "", $options: "i" } }]
    })
      .skip(getSkipPage(pageNumber, pageSize))
      .sort({ [sortBy]: sortDirection === SortDirection.asc ? 1 : -1 })
      .limit(pageSize)
      .lean();
    const totalCount = await BlogModel.countDocuments({
      $or: [{ name: { $regex: searchNameTerm ?? "", $options: "i" } }]
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
        createdAt: new Date()
      }))
    };
  }

  async getBlog(id: ObjectId): Promise<BlogsViewType | null> {
    const blog = await BlogModel.findById(id);
    if (!blog) return null;
    return {
      id: blog._id.toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: blog.createdAt
    };
  }
}
