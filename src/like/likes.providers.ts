import { Mongoose } from "mongoose";
import { LikesSchema } from "./likes.schema";

export const likesProviders = [
  {
    provide: "LIKE_MODEL",
    useFactory: (mongoose: Mongoose) => mongoose.model("Likes", LikesSchema),
    inject: ["DATABASE_CONNECTION"]
  }
];
