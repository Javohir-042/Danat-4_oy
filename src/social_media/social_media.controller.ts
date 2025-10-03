import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SocialMediaService } from './social_media.service';
import { CreateSocialMediaDto } from './dto/create-social_media.dto';
import { UpdateSocialMediaDto } from './dto/update-social_media.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { SocialMedia } from './model/social_media.model';
import { Role } from '../common/enum/admin.enum';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags("Social_media -- Ijtimoiy tarmoqlar")
@UseGuards(AuthGuard, RolesGuard)
@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) { }

  @ApiOperation({ summary: `Ijtimoiy tarmoq qo'shish` })
  @ApiResponse({
    status: 201,
    description: "Ijtimoiy tarmoq qoshildi",
    type: SocialMedia,
  })
  @ApiBearerAuth()
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.create(createSocialMediaDto);
  }

  @ApiOperation({ summary: `Ijtimoiy tarmoqlarni ko'rish` })
  @ApiResponse({
    status: 201,
    description: "Ko'rsatildi",
    type: SocialMedia,
  })
  @Roles("public")
  @Get()
  findAll() {
    return this.socialMediaService.findAll();
  }

  @ApiOperation({ summary: `Ijtimoiy tarmoqlarni by id orqali ko'rish` })
  @ApiResponse({
    status: 201,
    description: "Ko'rsatildi",
    type: SocialMedia,
  })
  @Roles("public")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialMediaService.findOne(+id);
  }

  @ApiOperation({ summary: `Ijtimoiy tarmoqlarni ozgartirish` })
  @ApiResponse({
    status: 201,
    description: "O'zgartirildi",
    type: SocialMedia,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialMediaDto: UpdateSocialMediaDto) {
    return this.socialMediaService.update(+id, updateSocialMediaDto);
  }

  @ApiOperation({ summary: `Ijtimoiy tarmoqlarni o'chirish` })
  @ApiResponse({
    status: 201,
    description: "O'chirildi",
    type: SocialMedia,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialMediaService.remove(+id);
  }
}
