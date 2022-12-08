import { Mongoose } from "mongoose";
import { PostSchema } from "./post.schema";

export const postsProviders = [
  {
    provide: "POST_MODEL",
    useFactory: (mongoose: Mongoose) => mongoose.model('Posts', PostSchema),
    inject: ["DATABASE_CONNECTION"]
  }
]
