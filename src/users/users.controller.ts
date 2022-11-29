import {
  Body,
  Controller,
  Delete,
  Get, HttpCode, HttpStatus, NotFoundException,
  Param,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { getUsersQueryParams } from "./dto/getUsersQueryParams";
import { UsersQueryRepository } from "./users.query-repository";
import { ObjectId } from "mongodb";
import { userDto } from "./dto/userDto";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService,
              private readonly usersQueryRepository: UsersQueryRepository) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() queryParams: getUsersQueryParams) {
    return this.usersQueryRepository.getAll(queryParams);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getUser(@Param("id") id: ObjectId) {
    return await this.usersQueryRepository.getUser(id);
  }

  @Post(":id")
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: userDto) {
    return await this.userService.createNewUser(createUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param("id") id: ObjectId) {
    const deleteResult = await this.userService.deleteUser(id);
    if (!deleteResult) throw new NotFoundException("User does not exist");
    return;
  }
}


