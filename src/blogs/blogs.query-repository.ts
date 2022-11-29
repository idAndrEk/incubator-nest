import { Injectable } from "@nestjs/common";
import { BlogsViewType, PaginationBlogsType } from "./types/blogsType";
import { SortDirection } from "../enums";
import { BlogModel } from "./blogs.schema";
import { getBlogsQueryParams } from "./dto/getBlogsQueryParams";
import { getCountPage, getSkipPage } from "../ utilities/getPage";
import { ObjectId } from "mongodb";
import { PostModel } from "../post/post.schema";
import { PaginationPostType, PostViewType } from "../post/types/postsType";
import { UserViewResponse } from "../users/types/usersType";
import { getPostForBlogerIdQueryParams } from "./dto/getPostForBlogIdqueryParams";

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

  async getPostByBlogId(id, {
    pageNumber = 1,
    pageSize = 10,
    sortDirection = SortDirection.desc,
    sortBy = "createdAt"
  }: getPostForBlogerIdQueryParams, user: UserViewResponse): Promise<PaginationPostType> {
    const postData = await PostModel
      .find({
        $or: [{ blogId: { $regex: id ?? "" } }]
      })
      .skip(getSkipPage(pageNumber, pageSize))
      .sort({ [sortBy]: sortDirection === SortDirection.asc ? 1 : -1 })
      .limit(pageSize)
      .lean();
    const totalCount = await PostModel.countDocuments({
      $or: [{ blogId: { $regex: id ?? "" } }]
    });
    let items: PostViewType[] = [];
    for (const post of postData) {
      const { likes, dislikes } = await this.likesRepository.getLikesAndDislikesCountByParentId((post._id).toString());
      post.extendedLikesInfo.likesCount = likes;
      post.extendedLikesInfo.dislikesCount = dislikes;
      let myStatus = !user ? "None" : await this.likesRepository.getLikeStatusByUserId((post._id).toString(), (user._id).toString());
      post.extendedLikesInfo.myStatus = myStatus;
      const newestLikes = await this.likesRepository.getNewestLikesByParentId((post._id).toString(), 3);
      items.push({
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        bloggerName: post.bloggerName,
        createdAt: post.createdAt,
        extendedLikesInfo: {
          likesCount: likes,
          dislikesCount: dislikes,
          myStatus,
          newestLikes
        }
      });
    }
    return {
      pagesCount: getCountPage(totalCount, pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items
    };
  }
}





