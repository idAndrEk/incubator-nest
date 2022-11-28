import { Injectable } from "@nestjs/common";
import { getCountPage, getSkipPage } from "../ utilities/getPage";
import { PaginationPostType, PostsType, PostViewType } from "./types/postsType";
import { SortDirection } from "../enums";
import { UserViewResponse } from "../users/types/usersType";
import { getPostQueryParams } from "./dto/getPostQueryParams";
import { PostModel } from "./post.schema";
import { ObjectId } from "mongodb";

@Injectable()
export class PostsQueryRepository {
  constructor(protected likesRepository: LikesRepository) {
  }

  async findPosts(user: UserViewResponse, {
                    pageNumber = 1,
                    pageSize = 10,
                    sortDirection = SortDirection.desc,
                    sortBy = "createdAt"
                  }: getPostQueryParams
  ): Promise<PaginationPostType> {
    const findPosts = await PostModel
      .find({})
      .skip(getSkipPage(pageNumber, pageSize))
      .limit(pageSize)
      .sort({ [sortBy]: sortDirection === SortDirection.asc ? 1 : -1 })
      .lean();
    const totalCount = await PostModel.countDocuments({});
    let items: PostViewType[] = [];
    for (const post of findPosts) {
      const {
        likes,
        dislikes
      } = await this.likesRepository.getLikesAndDislikesCountByParentId((post._id).toString());
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

  async findPost(id: ObjectId, user: UserViewResponse | undefined): Promise<PostViewType | null> {
    const post = await PostModel.findById(id);
    if (!post) return null;
    const { likes, dislikes } = await this.likesRepository.getLikesAndDislikesCountByParentId((post._id).toString());
    post.extendedLikesInfo.likesCount = likes;
    post.extendedLikesInfo.dislikesCount = dislikes;
    let defaultMyStatus = "None";
    if (user) {
      defaultMyStatus = await this.likesRepository.getLikeStatusByUserId((post._id).toString(), (user._id).toString());
    }
    post.extendedLikesInfo.myStatus = defaultMyStatus;
    const newestLikes = await this.likesRepository.getNewestLikesByParentId((post._id).toString(), 3);
    post.extendedLikesInfo.newestLikes = newestLikes;
    return {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      bloggerName: post.bloggerName,
      createdAt: post.createdAt,
      extendedLikesInfo: {
        likesCount: post.extendedLikesInfo.likesCount,
        dislikesCount: post.extendedLikesInfo.dislikesCount,
        myStatus: post.extendedLikesInfo.myStatus,
        newestLikes
      }
    };
  }

  async checkPost(id: ObjectId): Promise<PostsType | null> {
    let post = await PostModel.findById(id);
    if (!post) return null;
    return post;
  }

  async findPostByBlogId(blogId: ObjectId, user: UserViewResponse,{
    pageNumber = 1,
    pageSize = 10,
    sortDirection = SortDirection.desc,
    sortBy = "createdAt"
  }: getPostQueryParams): Promise<PaginationPostType> {

    const postData = await PostModel
      .find({
        $or: [{ blogId: { $regex: blogId ?? "" } }]
      })
      .skip(getSkipPage(pageNumber, pageSize))
      .limit(pageSize)
      .lean();
    const totalCount = await PostModel.countDocuments({
      $or: [{ blogId: { $regex: blogId ?? "" } }]
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