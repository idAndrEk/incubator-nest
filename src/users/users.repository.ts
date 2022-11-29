import { Injectable } from '@nestjs/common';
import { UserAccType } from "./types/usersType";
import { UserModel } from "./users.schema";
import { ObjectId } from "mongodb";

@Injectable()
export class UsersRepository {
  async createUser(newUser: UserAccType): Promise<UserAccType | null> {
    try {
      const user = new UserModel(newUser)
      await user.save()
      return user
    } catch (e) {
      return null
    }
  }

  async deleteUser(id: ObjectId): Promise<boolean> {
    const user = await UserModel.findByIdAndDelete(id)
    if (user) return true
    return false
  }
}
