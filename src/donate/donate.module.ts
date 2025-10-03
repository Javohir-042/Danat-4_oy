import { Module } from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateController } from './donate.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Donate } from './model/donate.model';
import { User } from '../user/model/user.model';
import { Recipient } from '../recipient/model/recipient.model';

@Module({
  imports: [SequelizeModule.forFeature([Donate,User, Recipient])],
  controllers: [DonateController],
  providers: [DonateService],
})
export class DonateModule {}
