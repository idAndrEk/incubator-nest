import { BlogsType } from './type/blogsType';
import mongoose from 'mongoose';

const BlogsSchema = new mongoose.Schema<BlogsType>({
  name: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export const BlogsModel = mongoose.model('Blogs', BlogsSchema);
