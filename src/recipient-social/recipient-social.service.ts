import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipientSocialDto } from './dto/create-recipient-social.dto';
import { UpdateRecipientSocialDto } from './dto/update-recipient-social.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RecipientSocial } from './model/recipient-social.model';
import { Recipient } from '../recipient/model/recipient.model';
import { SocialMedia } from '../social_media/model/social_media.model';
import { ResData } from '../lib/resDate';
import { where } from 'sequelize';

@Injectable()
export class RecipientSocialService {
  constructor(
    @InjectModel(RecipientSocial) private readonly recipientSocialModel: typeof RecipientSocial,
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient,
    @InjectModel(SocialMedia) private readonly socialMediaModel: typeof SocialMedia,
  ) { }

  async create(createRecipientSocialDto: CreateRecipientSocialDto): Promise<ResData<RecipientSocial | null>> {
    const { socialId, recipientId, social_url } = createRecipientSocialDto

    if (!socialId || !recipientId || !social_url) {
      throw new BadRequestException('Iltimos barchasini kiriting')
    }

    const recipient = await this.recipientModel.findByPk(recipientId)
    if (!recipient) {
      throw new NotFoundException('Bunday recipientId topilmadi')
    }

    const social = await this.socialMediaModel.findByPk(socialId)
    if (!social) {
      throw new NotFoundException('Bunday socialId topilmadi')
    }

    const newRecipirnt = await this.recipientSocialModel.create({ ...createRecipientSocialDto })

    return new ResData<RecipientSocial>('recipient-social create successFully', 201, newRecipirnt)
  }

  async findAll(): Promise<ResData<RecipientSocial[]>> {
    const recipientSocial = await this.recipientSocialModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })
    return new ResData('Rescipient-social successFully retrievet', 200, recipientSocial)
  }

  async findOne(id: number): Promise<ResData<RecipientSocial>> {
    const recipientSocialId = await this.recipientSocialModel.findByPk(id)
    if (!recipientSocialId) {
      throw new NotFoundException('Recipient-social not found')
    }


    return new ResData('Rescipient-social retrievet by id', 200, recipientSocialId);
  }

  async update(id: number, updateRecipientSocialDto: UpdateRecipientSocialDto): Promise<ResData<RecipientSocial>> {
    const recipientSocial = await this.recipientSocialModel.findByPk(id)
    if (!recipientSocial) {
      throw new NotFoundException('RecipientSocial not found')
    }

    const { socialId, recipientId } = updateRecipientSocialDto

    const socialID = await this.socialMediaModel.findByPk(socialId)
    if (!socialID) {
      throw new NotFoundException('Bunday SocialId topilmadi ')
    }

    const recipientID = await this.recipientModel.findByPk(recipientId)
    if (!recipientID) {
      throw new NotFoundException('Bunday recipientId topilmadi')
    }

    const recipientSocialUpdate = await this.recipientSocialModel.update(updateRecipientSocialDto, { where: { id }, returning: true })

    return new ResData('Recipient_social update by id ', 200, recipientSocialUpdate[1][0])
  }

  async remove(id: number) {
    const removed = await this.recipientSocialModel.destroy({ where: { id } })
    if(!removed){
      throw new NotFoundException('Recipient_social not found')
    }
    return { message: `recipient-social o'chirildi` }
  }
}
