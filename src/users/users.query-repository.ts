import { Inject, Injectable } from "@nestjs/common";
import { SortDirection } from "../enums";
import { getUsersQueryParams } from "./dto/getUsersQueryParams";
import { PaginationUserType, UserAccType, UserResponse } from "./types/usersType";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { getCountPage, getSkipPage } from "../utilities/getPage";

@Injectable()
export class UsersQueryRepository {
  constructor(@Inject("USER_MODEL") private readonly userModel: Model<UserAccType>) {
  }

  async getAll({
                   pageNumber = 1,
                   pageSize = 10,
                   sortDirection = SortDirection.desc,
                   sortBy = "createdAt"
                 }:getUsersQueryParams): Promise<PaginationUserType> {
    const usersData = await this.userModel
      .aggregate()
      .project({
        id: '$_id',
        login: '$accountData.login',
        email: '$accountData.email',
        createdAt: '$accountData.createdAt',
        _id: 0
      })
      .skip(getSkipPage(pageNumber, pageSize))
      .sort({[sortBy]: sortDirection === SortDirection.asc ? 1 : -1})
      .limit(pageSize)
    const totalCount = await this.userModel.countDocuments({})
    return {
      "pagesCount": getCountPage(totalCount, pageSize),
      "page": pageNumber,
      "pageSize": pageSize,
      "totalCount": totalCount,
      "items": usersData
    }
  }

  async getUser(id: ObjectId): Promise<UserResponse | null> {
    const user = await this.userModel.findById(id)
    if (!user) return null
    return {
      id: user._id,
      login: user.accountData.login,
      email: user.accountData.email,
      createdAt: user.accountData.createdAt
    }
  }
}
