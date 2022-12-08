import { Inject, Injectable } from "@nestjs/common";
import { CommentType, CreateCommentDto } from "./types/commentsType";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { commentDto } from "./dto/commentDto";

@Injectable()
export class CommentsRepository {
  constructor(@Inject("COMMENT_MODEL") private readonly commentModel: Model<CommentType>) {
  }

  async creteComment(newComment: CreateCommentDto): Promise<CommentType | null> {
    const comment = new this.commentModel(newComment)
    await comment.save()
    return comment
    if (!comment) return null
  }

  async updateComment(id: ObjectId, content: commentDto): Promise<boolean | null> {
    const comment = await this.commentModel.findByIdAndUpdate(id, {content})
    if (comment) return true
    return false
  }

  async deleteComment(id: string): Promise<boolean> {
    const deleteResult = await this.commentModel.findByIdAndDelete(id)
    if (!deleteResult) return false
    return true
  }

  async countPostComment(postId: string | null) {
    const commentByPostCount = await this.commentModel.countDocuments({postId})
    return commentByPostCount
  }

  async findPostComment(postId: string | null, page: number, pageSize: number, sortBy: string, sortDirection: SortDirection): Promise<CommentType[]> {
    const commentByPost = await this.commentModel
      .find({postId})
      .skip((page - 1) * pageSize)
      .sort({[sortBy]: sortDirection === SortDirection.Asc ? 1 : -1})
      .limit(pageSize)
      .lean()
    return commentByPost
  }
}
