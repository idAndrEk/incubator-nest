import { Module } from "@nestjs/common";

require("dotenv").config();
import { AppController } from "./app.controller";
import { BlogsModule } from "./blogs/blogs.module";
import { PostModule } from "./post/post.module";
import { UsersModule } from "./users/users.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { LikesModule } from "./like/likes.module";
import { MongooseModule } from "@nestjs/mongoose";
import * as process from "process";


@Module({
  imports: [MongooseModule.forRoot(process.env.MongoURI),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      },
      defaults: {
        from: "\"nest-modules\" <modules@nestjs.com>"
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    BlogsModule,
    PostModule,
    UsersModule,
    LikesModule
    // CommentModule,
  ],
  controllers: [AppController]
})
export class AppModule {
}


