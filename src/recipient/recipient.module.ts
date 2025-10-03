// recipient.module.ts
import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { AuthModule } from '../auth/auth.module'; 
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipient } from './model/recipient.model';
import { Card } from '../cards/model/card.model';
import { Donate } from '../donate/model/donate.model';
import { Shop } from '../shop/model/shop.model';
import { RecipientSocial } from '../recipient-social/model/recipient-social.model';

@Module({
  imports: [SequelizeModule.forFeature([Recipient, Card,RecipientSocial, Donate, Shop]),
  AuthModule,
],
  controllers: [RecipientController],
  providers: [RecipientService],
})
export class RecipientModule { }
