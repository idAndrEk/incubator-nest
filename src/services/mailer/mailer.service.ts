import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailConfirmationMessage(code: string, email: string) {
   const result = await this.mailerService.sendMail({
      from: "Andrey",
      to: email,
      subject: "Account verified",
      text: `https://somesite.com/confirm-email?code=${code}`
    });
    return result;
  }

  async sendEmailRecoveryMessage(code: string, email: string) {
      const result = await this.mailerService.sendMail({
      from: "Andrey",
      to: email,
      subject: "Recovery code",
      html: `<h1>Password recovery</h1>
                   <p>To finish password recovery please follow the link below:
                   <a href="https://somesite.com/password-recovery?recoveryCode=${code}">recovery password</a></p>`
    });
    return result;

  }
};

