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

export const likeInfoSchema = new mongoose.Schema({
  likesCount: {type: Number, default: 0},
  dislikesCount: {type: Number, default: 0},
  myStatus: {type: String}
}, {_id: false})
