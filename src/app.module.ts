import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogsModule } from "./blogs/blogs.module";
import { PostModule } from "./post/post.module";
import { UsersModule } from "./users/users.module";
import { MailModule } from "./services/mailer/mail.module";
import { MailConfigService } from "./services/mailer/mail-config.service";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MongoURI),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
      BlogsModule,
      PostModule,
      UsersModule,
    MailModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
