import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './model/order.model';
import { User } from '../user/model/user.model';
import { ResData } from '../lib/resDate';
import { Shop } from '../shop/model/shop.model';
import { getXHRResponse } from 'rxjs/internal/ajax/getXHRResponse';
import { threadId } from 'worker_threads';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(Shop) private readonly shopModel: typeof Shop,
    @InjectModel(User) private readonly userModel: typeof User,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<ResData<Order | null>> {
    const { sum, location, user_id, shop_id, status } = createOrderDto;

    if (!sum || !location || user_id === undefined || shop_id === undefined || !status) {
      throw new NotFoundException('Barchasini kiriting')
    }

    const shopd = await this.shopModel.findByPk(shop_id)
    if (!shopd) {
      throw new NotFoundException("Bunday shop_id topilmadi")
    }

    const user = await this.userModel.findByPk(user_id)
    if (!user) {
      throw new NotFoundException("Bunday user topilmadi")
    }

    const newOrder = await this.orderModel.create({
      ...createOrderDto
    });

    return new ResData<Order>("Order create successFully", 201, newOrder)
  }

  async findAll(): Promise<ResData<Order[]>> {
    const order = await this.orderModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })

    return new ResData("Order successFully retrieved", 200, order);
  }

  async findOne(id: number): Promise<ResData<Order>> {
    const order = await this.orderModel.findByPk(id, { include: { all: true } })
    if (!order) {
      throw new NotFoundException("Order not found")
    }

    return new ResData("Order retrieved by id", 200, order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<ResData<Order>> {
    const order = await this.orderModel.findByPk(id)
    if (!order) {
      throw new NotFoundException("Order not found")
    }

    const updateOrder = await this.orderModel.update({ ...updateOrderDto }, { where: { id }, returning: true })

    return new ResData("Order update by id", 200, updateOrder[1][0]);
  }

  async remove(id: number) {
    const deleted = await this.orderModel.destroy({ where: { id } })
    if (!deleted) {
      throw new NotFoundException("Bunday order mavjud emas")
    }
    return { message: `order o'chirildi` };
  }
}
