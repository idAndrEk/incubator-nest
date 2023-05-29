import { Inject, Injectable } from "@nestjs/common";
import { BlogsType, BlogsViewType, PaginationBlogsType } from "./types/blogsType";
import { SortDirection } from "../enums";
import { getBlogsQueryParams } from "./dto/getBlogsQueryParams";
import { PaginationPostType, PostsType, PostViewType } from "../post/types/postsType";
import { UserViewResponse } from "../users/types/usersType";
import { getPostForBlogerIdQueryParams } from "./dto/getPostForBlogIdqueryParams";
import { LikesRepository } from "../like/likesRepository";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { getCountPage, getSkipPage } from "../utilities/getPage";

@Injectable()
export class BlogsQueryRepository {
  constructor(@Inject("BLOG_MODEL") private readonly blogModel: Model<BlogsType>,
              @Inject("POST_MODEL") private readonly postModel: Model<PostsType>,
              private readonly likesRepository: LikesRepository) {
  }

  async getBlogs({
                   pageNumber = 1,
                   pageSize = 10,
                   searchNameTerm = null,
                   sortDirection = SortDirection.desc,
                   sortBy = "createdAt"
                 }: getBlogsQueryParams): Promise<PaginationBlogsType> {
    const findBlogs = await this.blogModel.find({
      $or: [{ name: { $regex: searchNameTerm ?? "", $options: "i" } }]
    })
      .skip(getSkipPage(pageNumber, pageSize))
      .sort({ [sortBy]: sortDirection === SortDirection.asc ? 1 : -1 })
      .limit(pageSize)
      .lean();
    const totalCount = await this.blogModel.countDocuments({
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
    const blog = await this.blogModel.findById(id);
    if (!blog) return null;
    return {
      id: blog._id.toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: blog.createdAt
    };
  }

  async getPostByBlogId(blogId, {
    pageNumber = 1,
    pageSize = 10,
    sortDirection = SortDirection.desc,
    sortBy = "createdAt"
  }: getPostForBlogerIdQueryParams, user: UserViewResponse): Promise<PaginationPostType> {
    const postData = await this.postModel
      .find({
        $or: [{ blogId: { $regex: blogId ?? "" } }]
        // "blogId":{$in: "blogId"}
        //  blogId: { $regex: { blogId } }
      })
      // .select(blogId)
      .skip(getSkipPage(pageNumber, pageSize))
      .sort({ [sortBy]: sortDirection === SortDirection.asc ? 1 : -1 })
      .limit(pageSize)
      .lean();
    console.log(postData);
    const totalCount = await this.postModel.countDocuments({
      $or: [{ blogId: { $regex: blogId ?? "" } }]
    });
    let items: PostViewType[] = [];
    for (const post of postData) {
      const { likes, dislikes } = await this.likesRepository.getLikesAndDislikesCountByParentId(post._id);
      post.extendedLikesInfo.likesCount = likes;
      post.extendedLikesInfo.dislikesCount = dislikes;
      let myStatus = !user ? "None" : await this.likesRepository.getLikeStatusByUserId(post._id, user._id);
      post.extendedLikesInfo.myStatus = myStatus;
      const newestLikes = await this.likesRepository.getNewestLikesByParentId(post._id, 3);
      items.push({
        id: post._id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
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





