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
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<ResData<Payment | null>> {
    const { user_id, donate_id, order_id, payment_method, status, amount, payment_date } = createPaymentDto;

    if (user_id === undefined || donate_id === undefined || order_id === undefined || !payment_method || !status || !amount || !payment_date) {
      throw new NotFoundException("Barchasini kiriting")
    }

    const user = await this.userModel.findByPk(user_id)
    if (!user) {
      throw new NotFoundException("Bunday user_id topilmadi")
    }

    const donate = await this.donateModel.findByPk(donate_id)
    if (!donate) {
      throw new NotFoundException("Bunday donat_id topilmadi")
    }

    const order = await this.orderModel.findByPk(order_id)
    if (!order) {
      throw new NotFoundException("Bunday order_id topilmadi")
    }

    const newPayment = await this.paymentModel.create({ ...createPaymentDto })

    return new ResData<Payment>("Payment create successFully", 201, newPayment)
  }

  async findAll(): Promise<ResData<Payment[]>> {
    const payment = await this.paymentModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })

    return new ResData("Payment successFully retrieved", 200, payment)
  }

  async findOne(id: number): Promise<ResData<Payment>> {
    const payment = await this.paymentModel.findByPk(id, { include: { all: true } })
    if (!payment) {
      throw new NotFoundException("Payment not found")
    }

    return new ResData("Payment retrieved by id", 200, payment);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<ResData<Payment>> {
    const payment = await this.paymentModel.findByPk(id)
    if (!payment) {
      throw new NotFoundException("Payment not found")
    }

    const { user_id, order_id, donate_id } = updatePaymentDto;

    if (user_id) {
      const user = await this.userModel.findByPk(user_id)
      if (!user) {
        throw new NotFoundException("Bunday user_id topilmadi")
      }
    }

    if (order_id) {
      const order = await this.userModel.findByPk(order_id)
      if (!order) {
        throw new NotFoundException("Bunday order_id topilmadi")
      }
    }

    if (donate_id) {
      const donat = await this.userModel.findByPk(donate_id)
      if (!donat) {
        throw new NotFoundException("Bunday donate_id topilmadi")
      }
    }

    const updatePayment = await this.paymentModel.update({ ...updatePaymentDto }, { where: { id }, returning: true })

    return new ResData("Payment update by id", 200, updatePayment[1][0])
  }

  async remove(id: number) {
    const deleted = await this.paymentModel.destroy({ where: { id } })
    if(!deleted){
      throw new NotFoundException("Budnay payment mavjud emas")
    }

    return {message: `payment o'chirildi`};
  }
}
