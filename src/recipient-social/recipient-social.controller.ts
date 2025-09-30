import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipientSocialService } from './recipient-social.service';
import { CreateRecipientSocialDto } from './dto/create-recipient-social.dto';
import { UpdateRecipientSocialDto } from './dto/update-recipient-social.dto';

@Controller('recipient-social')
export class RecipientSocialController {
  constructor(private readonly recipientSocialService: RecipientSocialService) {}

  @Post()
  create(@Body() createRecipientSocialDto: CreateRecipientSocialDto) {
    return this.recipientSocialService.create(createRecipientSocialDto);
  }

  @Get()
  findAll() {
    return this.recipientSocialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientSocialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipientSocialDto: UpdateRecipientSocialDto) {
    return this.recipientSocialService.update(+id, updateRecipientSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipientSocialService.remove(+id);
  }
}
