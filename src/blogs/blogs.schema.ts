import { BlogsType } from './types/blogsType';
import mongoose from 'mongoose';

export const BlogsSchema = new mongoose.Schema<BlogsType>({
  name: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export const BlogModel = mongoose.model('Blogs', BlogsSchema);
