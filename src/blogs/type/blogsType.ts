import { Types } from 'mongoose';

export type BlogsType = {
  _id: Types.ObjectId;
  name: string;
  youtubeUrl: string;
  createdAt: Date;
};

export type BlogsViewType = {
  id: string;
  name: string;
  youtubeUrl: string;
  createdAt: Date;
};

export type CreateBlogsDto = {
  name: string;
  youtubeUrl: string;
  createdAt: Date;
};

export type PaginationBlogsType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogsViewType[];
};
