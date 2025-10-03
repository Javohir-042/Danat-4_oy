import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSocialMediaDto } from './dto/create-social_media.dto';
import { UpdateSocialMediaDto } from './dto/update-social_media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SocialMedia } from './model/social_media.model';
import { ResData } from '../lib/resDate';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(SocialMedia) private readonly social_mediaModel: typeof SocialMedia,
  ) { }

  async create(createSocialMediaDto: CreateSocialMediaDto): Promise<ResData<SocialMedia | null>> {
    const { social_media, iconic_url } = createSocialMediaDto;

    if (!social_media || !iconic_url) {
      throw new NotFoundException('Iltimos barchasini kiriting')
    }

    const newSocialMedia = await this.social_mediaModel.create(createSocialMediaDto)

    return new ResData<SocialMedia>('Admin yaratildi ', 201, newSocialMedia)
  }

  async findAll(): Promise<ResData<SocialMedia[]>> {
    const social_medi = await this.social_mediaModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })

    return new ResData('social_media successfully retrieved', 200, social_medi)
  }

  async findOne(id: number): Promise<ResData<SocialMedia>> {
    const social_mediId = await this.social_mediaModel.findByPk(id, { include: { all: true } })
    if (!social_mediId) {
      throw new NotFoundException('Social_mediaId not found')
    }

    return new ResData('social_mediaId boyicha malumotlar olindi', 200, social_mediId);
  }

  async update(id: number, updateSocialMediaDto: UpdateSocialMediaDto): Promise<ResData<SocialMedia>> {
    const social_mediId = await this.social_mediaModel.findByPk(id)
    if (!social_mediId) {
      throw new NotFoundException('Social_mediId not found')
    }

    await this.social_mediaModel.update(
      { ...updateSocialMediaDto },
      { where: { id } }
    );

    const updatedSocialMedia = await this.social_mediaModel.findByPk(id);
    return new ResData("Social_media update by id", 200, updatedSocialMedia);

  }

  async remove(id: number){
    const deleted = await this.social_mediaModel.destroy({ where: { id } })

    if (!deleted) {
      throw new NotFoundException('Bunday social_mediaId mavjud emas')
    }
    return { message: `social_mediaId o'chirildi` }
  }
}
