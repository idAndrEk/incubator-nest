import { Inject, Injectable } from "@nestjs/common";
import { UserAccType } from "./types/usersType";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository {
  constructor(@Inject("USER_MODEL") private readonly userModel: Model<UserAccType>) {
  }
  async createUser(newUser: UserAccType): Promise<UserAccType | null> {
    try {
      const user = new this.userModel(newUser)
      await user.save()
      return user
    } catch (e) {
      return null
    }
  }

  async deleteUser(id: ObjectId): Promise<boolean> {
    const user = await this.userModel.findByIdAndDelete(id)
    if (user) return true
    return false
  }
}
