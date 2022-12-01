import { Injectable } from "@nestjs/common";
import { LikeModel } from "./likes.schema";
import { ObjectId } from "mongodb";

@Injectable()
export class LikesRepository {

  async addLikeOrDislikeOrNone(parentId: ObjectId, userId: string, login: string, status: string) {
    await LikeModel.findOneAndUpdate({parentId, userId}, {status, createdAt: new Date(), login}, {upsert: true})
    return
  }

  async getLikesAndDislikesCountByParentId(parentId: ObjectId) {
    const likes = await LikeModel.countDocuments({parentId, status: 'Like'})
    const dislikes = await LikeModel.countDocuments({parentId, status: 'Dislike'})
    return {likes, dislikes}
  }

  async getLikeStatusByUserId(parentId: ObjectId, userId: string) {
    const result = await LikeModel.findOne({parentId, userId})
    if (result) return result.status
    return 'None'
  }

  async getNewestLikesByParentId(parentId: ObjectId, count: number)/*: Promise <NewestLikes>*/ {
    const newestLikes = await LikeModel.find(
      {parentId, status: 'Like'},
      {_id: 0, __v: 0, parentId: 0, status: 0},
    )
      .sort({'createdAt': -1}) //
      .limit(count)
      .lean()
    return newestLikes
  }
}