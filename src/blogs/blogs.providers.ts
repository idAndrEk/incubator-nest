import { Mongoose } from "mongoose";
import { BlogSchema } from "./blogSchema";

export const blogsProviders = [
  {
    provide: "BLOG_MODEL",
    useFactory: (mongoose: Mongoose) => mongoose.model("Blogs", BlogSchema),
    inject: ["DATABASE_CONNECTION"]
  }
];
