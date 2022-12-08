import { Mongoose } from "mongoose";
import { CommentSchema } from "./commentSchema";

export const commentProviders=[{
  provide:"COMMENT_MODEL",
  useFactory: (mongoose: Mongoose) => mongoose.model("Comments", CommentSchema),
  inject: ["DATABASE_CONNECTION"]
}]
