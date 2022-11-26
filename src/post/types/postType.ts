import { ObjectId } from 'mongodb';

export type PostType = {
  _id: ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  bloggerName: string;
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
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  bloggerName: string;
  createdAt: Date;
  extendedLikesInfo: ExtendedLikesInfo;
};

export type CreatePostDto = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  bloggerName: string;
  createdAt: Date;
  extendedLikesInfo: ExtendedLikesInfo;
};

export type ExtendedLikesInfo = {
  likesCount: number;
  dislikesCount: number;
  myStatus: string;
  newestLikes: NewestLikes[];
};

export type NewestLikes = {
  createdAt: Date;
  userId: ObjectId;
  login: string;
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
