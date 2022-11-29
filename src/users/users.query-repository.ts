import { Injectable } from "@nestjs/common";
import { UserModel } from "./users.schema";
import { getCountPage, getSkipPage } from "../ utilities/getPage";
import { SortDirection } from "../enums";
import { getUsersQueryParams } from "./dto/getUsersQueryParams";
import { PaginationUserType, UserResponse } from "./types/usersType";
import { ObjectId } from "mongodb";

@Injectable()
export class UsersQueryRepository {

  async getAll({
                   pageNumber = 1,
                   pageSize = 10,
                   sortDirection = SortDirection.desc,
                   sortBy = "createdAt"
                 }:getUsersQueryParams): Promise<PaginationUserType> {
    const usersData = await UserModel
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
    const totalCount = await UserModel.countDocuments({})
    return {
      "pagesCount": getCountPage(totalCount, pageSize),
      "page": pageNumber,
      "pageSize": pageSize,
      "totalCount": totalCount,
      "items": usersData
    }
  }

  async getUser(id: ObjectId): Promise<UserResponse | null> {
    const user = await UserModel.findById(id)
    if (!user) return null
    return {
      id: user._id,
      login: user.accountData.login,
      email: user.accountData.email,
      createdAt: user.accountData.createdAt
    }
  }
}