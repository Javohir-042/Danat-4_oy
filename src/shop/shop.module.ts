import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { Shop } from './model/shop.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from '../category/model/category.model';
import { Recipient } from '../recipient/model/recipient.model';
import { Order } from '../order/model/order.model';

@Module({
  imports: [SequelizeModule.forFeature([Shop,Category, Recipient, Order])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
