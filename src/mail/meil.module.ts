import { Module } from '@nestjs/common';
import { MeilService } from './meil.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";


@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string> ("MAILER_HOST"),
          secure: false,
          auth: {
            user: config.get<string>("MAILDEV_USER"),
            pass: config.get<string>("MAILDEV_PASS"),
          }
        },
        defaults: {
          from: `Donat <${config.get<string>("MAILDEV_USER")}`
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          template: 'confirmation',
          options: {
            strict: true,
          }
        }
      }),
      inject: [ConfigService],
    })
  ],
  providers: [MeilService],
  exports: [MeilService]
})
export class MeilModule {}
