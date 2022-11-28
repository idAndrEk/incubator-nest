import mongoose from "mongoose";
import { UserAccType } from "./types/usersType";

export const UserSchema = new mongoose.Schema<UserAccType>({
  accountData: {
    login: {type: String, required: true},
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    createdAt: Date
  },
  emailConfirmation: {
    confirmationCode: {type: String, required: true},
    expirationDate: Date,
    isConfirmed: Boolean
  }
})

export const UserModel = mongoose.model('Users', UserSchema)