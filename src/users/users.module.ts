import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./users.schema";
import { UsersRepository } from "./users.repository";
import { UsersQueryRepository } from "./users.query-repository";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PasswordService } from "../services/passwordService/password.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "users", schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersQueryRepository,PasswordService],
  exports: []
})

export class UsersModule {
}