import mongoose from "mongoose";
import { CommentType } from "./types/commentsType";
import { likeInfoSchema } from "../like/likes.schema";

export const CommentSchema = new mongoose.Schema<CommentType>({
  postId: {type: String, required: true},
  content: {type: String, required: true},
  userId: {type: String, required: true},
  userLogin: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  likesInfo: {type: likeInfoSchema}
})
