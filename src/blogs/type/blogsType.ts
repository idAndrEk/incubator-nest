import { Types } from 'mongoose';

export type BlogsType = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
};

export type BlogsViewType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
};

export type CreateBlogs = {
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
};

export type PaginationBlogsType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogsViewType[];
};
