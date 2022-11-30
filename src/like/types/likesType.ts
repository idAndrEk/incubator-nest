import { ObjectId } from "mongoose";

export type ExtendedLikesInfo = {
  likesCount: number
  dislikesCount: number
  myStatus: string
  newestLikes: NewestLikes[]
}

export type NewestLikes = {
  createdAt: Date
  userId: ObjectId
  login: string
}

export type LikesType = {
  parentId: ObjectId
  status: string
  createdAt: Date
  userId: ObjectId
  login: string
}


export type LikesInfo = {
  likesCount: number,
  dislikesCount: number,
  myStatus: string
}