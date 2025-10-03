import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './model/payment.model';
import { User } from '../user/model/user.model';
import { Donate } from '../donate/model/donate.model';
import { Order } from '../order/model/order.model';
import { ResData } from '../lib/resDate';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Donate) private readonly donateModel: typeof Donate,
    @InjectModel(Order) private readonly orderModel: typeof Order,
  ){}

  async create(createPaymentDto: CreatePaymentDto): Promise<ResData<Payment | null>> {
    const {user_id, donate_id, order_id, payment_method, status, amount, payment_date} = createPaymentDto;

    if(user_id === undefined || donate_id === undefined || order_id === undefined || !payment_method || !status || !amount || !payment_date ){
      throw new NotFoundException("Barchasini kiriting")
    }

    const user = await this.userModel.findByPk(user_id)
    if(!user){
      throw new 
    }
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
