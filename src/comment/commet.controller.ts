import { CommentsQueryRepository } from "./comment.query-repostory";
import { CommentsService } from "./comment.service";
import { Body, Get, HttpCode, HttpStatus, Injectable, NotFoundException, Param, Put, Req } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { UserViewResponse } from "../users/types/usersType";
import { commentDto } from "./dto/commentDto";

@Injectable()
export class CommentsController {

  constructor(protected commentsService: CommentsService,
              protected commentsQueryRepository: CommentsQueryRepository) {
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getComment(
    @Param("id") id: ObjectId,
    @Req() user: UserViewResponse) {
    return await this.commentsQueryRepository.getComment(id, user);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async updateComment(
    @Param("id") id: ObjectId,
    @Body() updateComment: commentDto
  ) {
    const checkComment = await this.commentsQueryRepository.checkComment(id);
    if (!checkComment) throw new NotFoundException("Comment does not exist!");
    const updateResult = await this.commentsService.updateComment(id, updateComment);
    return updateResult;
  }
}
