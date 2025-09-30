import { Module } from '@nestjs/common';
import { SocialMediaService } from './social_media.service';
import { SocialMediaController } from './social_media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialMedia } from './model/social_media.model';
import { RecipientSocial } from '../recipient-social/model/recipient-social.model';

@Module({
  imports: [SequelizeModule.forFeature([SocialMedia,RecipientSocial])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
})
export class SocialMediaModule {}
