import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Shop } from './model/shop.model';
import { Recipient } from '../recipient/model/recipient.model';
import { Category } from '../category/model/category.model';
import { ResData } from '../lib/resDate';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop) private readonly shopModel: typeof Shop,
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient,
    @InjectModel(Category) private readonly categoryModel: typeof Category
  ) { }

  async create(createShopDto: CreateShopDto): Promise<ResData<Shop>> {
    const { name, count, price, title, recipent_id, category_id, description } = createShopDto

    if (!name || !count || !price || !title || recipent_id === undefined || category_id === undefined || !description) {
      throw new NotFoundException('barchasini kiriting')
    }

    const recipient = await this.recipientModel.findByPk(recipent_id)
    if (!recipient) {
      throw new NotFoundException('Bunday recipent_id topilmadi')
    }

    const category = await this.categoryModel.findByPk(category_id)
    if (!category) {
      throw new NotFoundException('Bunday category_id topilmadi')
    }

    const newShop = await this.shopModel.create({ ...createShopDto })

    return new ResData<Shop>("Shop create successFully", 201, newShop)
  }

  async findAll(): Promise<ResData<Shop[]>> {
    const shop = await this.shopModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })

    return new ResData("Shop successFully retrieved", 200, shop)
  }

  async findOne(id: number): Promise<ResData<Shop>> {
    const shop = await this.shopModel.findByPk(id, { include: { all: true } })
    if (!shop) {
      throw new NotFoundException("Shop not found")
    }

    return new ResData("Shop retrieved by id", 200, shop);
  }

  async update(id: number, updateShopDto: UpdateShopDto): Promise<ResData<Shop>> {
    const shop = await this.shopModel.findByPk(id)
    if (!shop) {
      throw new NotFoundException("Shop not found")
    }

    const { recipent_id, category_id } = updateShopDto

    if (recipent_id) {
      const recipent = await this.recipientModel.findByPk(recipent_id)
      if (!recipent) {
        throw new NotFoundException("Bunday recipent_id topilmadi")
      }
    }

    if (category_id) {
      const category = await this.categoryModel.findByPk(category_id)
      if (!category) {
        throw new NotFoundException("Bunday category_id topilmadi")
      }
    }

    const updateShop = await this.shopModel.update({ ...updateShopDto }, { where: { id }, returning: true })

    return new ResData("Shop update by id", 200, updateShop[1][0]);;
  }

  async remove(id: number) {
    const deleted = await this.shopModel.destroy({ where: { id } })

    if (!deleted) {
      throw new NotFoundException('Bunday shop mavjud emas')
    }
    return { message: `shop o'chirildi` }
  }
}
