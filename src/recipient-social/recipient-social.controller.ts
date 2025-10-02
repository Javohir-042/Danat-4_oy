import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RecipientSocialService } from './recipient-social.service';
import { CreateRecipientSocialDto } from './dto/create-recipient-social.dto';
import { UpdateRecipientSocialDto } from './dto/update-recipient-social.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RecipientSocial } from './model/recipient-social.model';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/admin.enum';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiTags("Recipient_Social -- Ichtimoiy tamoqlarn qabul qilivchi")
@Controller('recipient-social')
export class RecipientSocialController {
  constructor(private readonly recipientSocialService: RecipientSocialService) { }


  @ApiOperation({ summary: `Qabul qiluvchining ijtimoiy tarmog'ini qo'shish` })
  @ApiResponse({
    status: 201,
    description: "Qo'shildi",
    type: RecipientSocial,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.USER)
  @Post()
  create(@Body() createRecipientSocialDto: CreateRecipientSocialDto) {
    return this.recipientSocialService.create(createRecipientSocialDto);
  }
  

  @ApiOperation({ summary: `Qabul qiluvchining ijtimoiy tarmog'ini ko'rish` })
  @ApiResponse({
    status: 201,
    description: "Ijtimoiy tarmoq ko'rsatildi",
    type: RecipientSocial,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.recipientSocialService.findAll();
  }


  @ApiOperation({ summary: `Qabul qiluvchining ijtimoiy tarmog'ini by id orqali ko'rish` })
  @ApiResponse({
    status: 201,
    description: "Ijtimoiy tarmoq ko'rsatildi",
    type: RecipientSocial,
  })
  @Roles('public')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientSocialService.findOne(+id);
  }


  @ApiOperation({ summary: `Qabul qiluvchining ijtimoiy tarmog'ini yangilash` })
  @ApiResponse({
    status: 201,
    description: "Yangilandi",
    type: RecipientSocial,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipientSocialDto: UpdateRecipientSocialDto) {
    return this.recipientSocialService.update(+id, updateRecipientSocialDto);
  }


  @ApiOperation({ summary: `Qabul qiluvchining ijtimoiy tarmog'ini o'chirish` })
  @ApiResponse({
    status: 201,
    description: "O'chirildi",
    type: RecipientSocial,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipientSocialService.remove(+id);
  }
}
