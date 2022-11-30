import { Module } from "@nestjs/common";
import { MailService } from "./mailer.service";

@Module({
imports: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}




