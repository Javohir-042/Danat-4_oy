import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './model/card.model';
import { Recipient } from '../recipient/model/recipient.model';
import { ResData } from '../lib/resDate';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card) private readonly cardsModel: typeof Card,
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient,
  ) { }

  async create(createCardDto: CreateCardDto): Promise<ResData<Card | null>> {

    const { recipientId } = createCardDto;

    const recipient = await this.recipientModel.findByPk(recipientId)
    if (!recipient) {
      throw new NotFoundException('Bunday recipientId topilmadi')
    }

    const newCard = await this.cardsModel.create(createCardDto)

    return new ResData<Card>("Card create successFully", 201, newCard);
  }

  async findAll(): Promise<ResData<Card[]>> {
    const cards = await this.cardsModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })
    return new ResData('Cards successfully retrieved', 200, cards)
  }

  async findOne(id: number): Promise<ResData<Card>> {
    const cards = await this.cardsModel.findByPk(id, { include: { all: true } })
    if (!cards) {
      throw new NotFoundException('Cards not found')
    }

    return new ResData('Cards retrieved by id', 200, cards);
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<ResData<Card>> {
    const CardsId = await this.cardsModel.findByPk(id)
    if (!CardsId) {
      throw new NotFoundException('CardsId not found')
    }

    const { recipientId } = updateCardDto

    const recipientID = await this.cardsModel.findByPk(recipientId)
    if (!recipientID) {
      throw new NotFoundException('Bunday recipientId topilmadi')
    }

    const newCards = await this.cardsModel.update({ ...updateCardDto }, { where: { id }, returning: true })

    return new ResData('Cards update by id', 200, newCards[1][0])
  }

  async remove(id: number) {
    const deleted = await this.cardsModel.destroy({ where: { id } })

    if (!deleted) {
      throw new NotFoundException('Bunday card mavjud emas')
    }
    return { message: `Card o'chirildi` }
  }
}
