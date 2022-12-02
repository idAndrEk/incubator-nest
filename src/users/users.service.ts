import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { userDto } from "./dto/userDto";
import { UserAccType, UserResponse } from "./types/usersType";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import add from "date-fns/add";
import { PasswordService } from "../services/passwordService/password.service";
import { MailService } from "../services/mailer/mailer.service";


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository,
              private readonly passwordService: PasswordService,
              private readonly mailerService:MailService) {
  }

  async createNewUser({ login, email, password }: userDto): Promise<UserResponse | null> {
    const passwordHash = await this.passwordService.hashPassword(password);
    const user: UserAccType = {
      _id: new ObjectId(),
      accountData: {
        login: login,
        email,
        passwordHash,
        createdAt: new Date()
      },
      emailConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), { hours: 1 }),
        isConfirmed: false
      }
    };
    const newUserDB = await this.usersRepository.createUser(user);
    if (!newUserDB) return null;
    await this.mailerService.sendEmailConfirmationMessage(user.emailConfirmation.confirmationCode, user.accountData.email);
    const userResponse = {
      id: user._id,
      login: user.accountData.login,
      email: user.accountData.email,
      createdAt: user.accountData.createdAt
    };
    if (userResponse) return userResponse;
    return null;
  }

  async deleteUser(id: ObjectId): Promise<boolean> {
    return await this.usersRepository.deleteUser(id);
  }
}
