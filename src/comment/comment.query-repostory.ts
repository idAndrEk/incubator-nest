import { Inject, Injectable } from "@nestjs/common";
import { LikesRepository } from "../like/likesRepository";
import { CommentType, CommentViewType } from "./types/commentsType";
import { Model } from "mongoose";
import { UserViewResponse } from "../users/types/usersType";
import { ObjectId } from "mongodb";

@Injectable()
export class CommentsQueryRepository {
  constructor (@Inject("COMMENT_MODEL") private readonly commentModel: Model<CommentType>,
               protected likesRepository: LikesRepository) {}

  async getComment(id: ObjectId, user: UserViewResponse ): Promise<CommentViewType | null> {
    const comment = await this.commentModel.findById(id)
    if (!comment) return null
    const {likes, dislikes} = await this.likesRepository.getLikesAndDislikesCountByParentId(comment._id)
    comment.likesInfo.likesCount = likes
    comment.likesInfo.dislikesCount = dislikes
    let defaultMyStatus = 'None'
    if (user) {
      defaultMyStatus = await this.likesRepository.getLikeStatusByUserId((comment._id), (user._id))
    }
    comment.likesInfo.myStatus = defaultMyStatus
    return {
      id: comment._id.toString(),
      content: comment.content,
      userId: comment.userId,
      userLogin: comment.userLogin,
      createdAt: comment.createdAt,
      likesInfo: {
        likesCount: comment.likesInfo.likesCount,
        dislikesCount: comment.likesInfo.dislikesCount,
        myStatus: comment.likesInfo.myStatus
      }
    }
  }

  async checkComment(id: ObjectId): Promise<CommentViewType | null> {
    const comment = await this.commentModel.findById(id)
    if (!comment) return null
    return {
      id: comment._id.toString(),
      content: comment.content,
      userId: comment.userId,
      userLogin: comment.userLogin,
      createdAt: comment.createdAt,
      likesInfo: {
        likesCount: comment.likesInfo.likesCount,
        dislikesCount: comment.likesInfo.dislikesCount,
        myStatus: comment.likesInfo.myStatus
      }
    }
  }
}
