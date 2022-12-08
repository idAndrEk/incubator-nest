import { BlogsType } from './types/blogsType';
import mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema<BlogsType>({
  name: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
});


