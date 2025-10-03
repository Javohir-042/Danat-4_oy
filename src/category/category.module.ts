import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { Shop } from '../shop/model/shop.model';

@Module({
  imports: [SequelizeModule.forFeature([Category, Shop])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
