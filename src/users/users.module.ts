import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./users.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "users", schema: UserSchema }])
  ],
  controllers: [],
  providers: [],
  exports: []
})

export class UsersModule {
}