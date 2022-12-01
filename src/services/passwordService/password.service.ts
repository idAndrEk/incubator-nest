import bcrypt from "bcryptjs";
// import bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class PasswordService {
  async isMatch(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }
}

