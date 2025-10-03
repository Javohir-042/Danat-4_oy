import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { Payment } from '../payments/model/payment.model';
import { Order } from '../order/model/order.model';
import { Donate } from '../donate/model/donate.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Payment, Order, Donate])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
