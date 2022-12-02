// import { Injectable } from "@nestjs/common";
// import { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";
// import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
//
// @Injectable()
// export class MailConfigService implements MailerOptionsFactory {
//
//
//   createMailerOptions(): MailerOptions {
//     return {
//       transport: {
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         // secure: false, // upgrade later with STARTTLS
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASSWORD
//         }
//       },
//
//       defaults: {
//         from: "\"nest-modules\" <modules@nestjs.com>"
//       },
//
//       template: {
//         dir: __dirname + "/templates",
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true
//         }
//       }
//     } as MailerOptions;
//   }
// }
//
