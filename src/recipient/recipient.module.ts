// recipient.module.ts
import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { AuthModule } from '../auth/auth.module'; 
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipient } from './model/recipient.model';

@Module({
  imports: [SequelizeModule.forFeature([Recipient]),
  AuthModule,
],
  controllers: [RecipientController],
  providers: [RecipientService],
})
export class RecipientModule { }
