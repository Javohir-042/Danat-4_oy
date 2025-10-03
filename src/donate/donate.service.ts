import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonateDto } from './dto/create-donate.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Donate } from './model/donate.model';
import { User } from '../user/model/user.model';
import { Recipient } from '../recipient/model/recipient.model';
import { ResData } from '../lib/resDate';

@Injectable()
export class DonateService {
  constructor(
    @InjectModel(Donate) private readonly donateModel: typeof Donate,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient,
  ) { }

  async create(createDonateDto: CreateDonateDto): Promise<ResData<Donate | null>> {
    const { recipient_id, user_id } = createDonateDto

    if (recipient_id === undefined || user_id === undefined) {
      throw new NotFoundException("Barchasini kiriting")
    }

    const recipient = await this.recipientModel.findByPk(recipient_id)
    if (!recipient) {
      throw new NotFoundException("Bunday recipient_id topilmadi")
    }

    const user = await this.userModel.findByPk(user_id)
    if (!user) {
      throw new NotFoundException("Bunday user_id topilmadi")
    }

    const newDonate = await this.donateModel.create({ ...createDonateDto })

    return new ResData<Donate>("Donate create successFully", 201, newDonate)
  }

  async findAll(): Promise<ResData<Donate[]>> {
    const donat = await this.donateModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })

    return new ResData("Donate successFuolly retrieved", 200, donat)
  }

  async findOne(id: number): Promise<ResData<Donate>> {
    const donate = await this.donateModel.findByPk(id, { include: { all: true } })
    if (!donate) {
      throw new NotFoundException("Donat not found")
    }

    return new ResData("Donate retrieved by id", 200, donate);
  }

  async update(id: number, updateDonateDto: UpdateDonateDto): Promise<ResData<Donate>> {
    const donate = await this.donateModel.findByPk(id)
    if (!donate) {
      throw new NotFoundException("Donate not found")
    }

    const { user_id, recipient_id } = updateDonateDto

    if (recipient_id) {
      const recipent = await this.recipientModel.findByPk(recipient_id)
      if (!recipent) {
        throw new NotFoundException("Bunday recipent_id topilmadi")
      }
    }

    if (user_id) {
      const user = await this.userModel.findByPk(user_id)
      if (!user) {
        throw new NotFoundException("Bunday user_id topilmadi")
      }
    }

    await donate.update(updateDonateDto)
    return new ResData('Donate successFully update', 200, donate);
  }

  async remove(id: number) {
    const removed = await this.donateModel.destroy({ where: { id } })
    if (!removed) {
      throw new NotFoundException("Bunday donate mavjud emas")
    }
    return { message: `donat o'chirildi` }
  }
}
