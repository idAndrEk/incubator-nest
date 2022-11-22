import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(protected userService: UsersService) {}

  @Get()
  getUsers(@Query('term') term: string) {
    return this.userService.findUsers(term);
  }

  @Get(':id')
  getUser(@Param('id') userId) {
    return [{ id: 1 }, { id: 2 }].find((u) => u.id === +userId);
  }

  @Post(':id')
  deleteUsers(@Body() inputModel: CreateUserInputModelType) {
    return {
      id: 12,
      name: inputModel.name,
      childrenCount: inputModel.childrenCount,
    };
  }

  @Put(':id')
  updateUser(
    @Param('id') userId: string,
    @Body() model: CreateUserInputModelType,
  ) {
    return {
      id: userId,
      model: model,
    };
  }

  @Delete(':id')
  createUser(@Param('id') userId: string) {
    return;
  }
}
type CreateUserInputModelType = {
  name: string;
  childrenCount: number;
};
