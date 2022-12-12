import { ObjectId } from 'mongodb';
import { ExtendedLikesInfo } from "../../like/types/likesType";

export type PostsType = {
  _id: ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: ObjectId;
  blogName: string;
  createdAt: Date;
  extendedLikesInfo: ExtendedLikesInfo;
};

export type PaginationPostType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostViewType[];
};

export type PostViewType = {
  id: ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: ObjectId;
  blogName: string;
  createdAt: Date;
  extendedLikesInfo: ExtendedLikesInfo;
};

export type CreatePostDto = {
  title: string;
  shortDescription: string;
  content: string;
  blogId:ObjectId;
  blogName: string;
  createdAt: Date;
  extendedLikesInfo: ExtendedLikesInfo;
};

export type LikesType = {
  parentId: ObjectId;
  status: string;
  createdAt: Date;
  userId: ObjectId;
  login: string;
};

export type LikesInfo = {
  likesCount: number;
  dislikesCount: number;
  myStatus: string;
};
