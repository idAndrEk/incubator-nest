import { LikesType } from "./types/likesType";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const LikesSchema = new mongoose.Schema<LikesType>({
  parentId: {type: ObjectId, required: true},
  status: {type: String, required: true},
  createdAt: {type: Date, required: true},
  userId: {type: ObjectId, required: true},
  login: {type: String, required: true},
})
export const LikeModel = mongoose.model('Likes', LikesSchema)