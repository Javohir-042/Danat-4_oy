import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/model/admin.model';

@Injectable()
export class MeilService {
    constructor(private readonly mailerService: MailerService){}

    async sendMail(admin: Admin) {
        const url = `${process.env.PORT}/api/admin/activate/${admin.activation_link}`

        await this.mailerService.sendMail({
            to: admin.email,
            subject: "Welcome to Skidkachi App!",
            template: './confirmation',
            context: {
                name: admin.full_name,
                url,
            },
        });
    }
}
