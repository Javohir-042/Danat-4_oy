import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './model/card.model';
import { Recipient } from '../recipient/model/recipient.model';

@Module({
  imports: [SequelizeModule.forFeature([Card, Recipient])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
