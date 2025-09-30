import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipient } from './model/recipient.model';
import { RecipientSocial } from '../recipient-social/model/recipient-social.model';
import { Card } from '../cards/model/card.model';

@Module({
  imports: [SequelizeModule.forFeature([Recipient,RecipientSocial, Card])],
  controllers: [RecipientController],
  providers: [RecipientService],
})
export class RecipientModule {}
