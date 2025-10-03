import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './model/order.model';
import { Shop } from '../shop/model/shop.model';
import { User } from '../user/model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Order, Shop, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
