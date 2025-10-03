import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './model/payment.model';
import { Donate } from '../donate/model/donate.model';
import { User } from '../user/model/user.model';
import { Order } from '../order/model/order.model';

@Module({
  imports: [SequelizeModule.forFeature([Payment, Donate, User, Order])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
