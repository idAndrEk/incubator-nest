import { PostsType } from './types/postsType';
import mongoose from 'mongoose';

const extendedLikesInfoSchema = new mongoose.Schema(
  {
    likesCount: { type: Number, default: 0 },
    dislikesCount: { type: Number, default: 0 },
    myStatus: { type: String },
  },
  { _id: false },
);

export const PostSchema = new mongoose.Schema<PostsType>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  blogId: { type: String, required: true },
  bloggerName: { type: String, required: true },
  createdAt: { type: Date, required: true },
  extendedLikesInfo: { type: extendedLikesInfoSchema },
});


