import { Inject, Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { LikesType } from "./types/likesType";

@Injectable()
export class LikesRepository {
  constructor(@Inject("LIKE_MODEL") protected readonly likeModel: Model<LikesType>) {
  }

  async addLikeOrDislikeOrNone(parentId: ObjectId, userId: string, login: string, status: string) {
    await this.likeModel.findOneAndUpdate({parentId, userId}, {status, createdAt: new Date(), login}, {upsert: true})
    return
  }

  async getLikesAndDislikesCountByParentId(parentId: ObjectId) {
    const likes = await this.likeModel.countDocuments({parentId, status: 'Like'})
    const dislikes = await this.likeModel.countDocuments({parentId, status: 'Dislike'})
    return {likes, dislikes}
  }

  async getLikeStatusByUserId(parentId: ObjectId, userId: string) {
    const result = await this.likeModel.findOne({parentId, userId})
    if (result) return result.status
    return 'None'
  }

  async getNewestLikesByParentId(parentId: ObjectId, count: number)/*: Promise <NewestLikes>*/ {
    const newestLikes = await this.likeModel.find(
      {parentId, status: 'Like'},
      {_id: 0, __v: 0, parentId: 0, status: 0},
    )
      .sort({'createdAt': -1}) //
      .limit(count)
      .lean()
    return newestLikes
  }
}
