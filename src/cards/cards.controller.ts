import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { Role } from '../common/enum/admin.enum';
import { Card } from './model/card.model';

@ApiTags("cards - Kartalar")
@UseGuards(AuthGuard, RolesGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @ApiOperation({ summary: "Card yaratish" })
  @ApiResponse({
    status: 201,
    description: "Card yaratish",
    type: Card,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiBearerAuth()
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }


  @ApiOperation({ summary: "Card ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Card ko'rindi",
    type: Card,
  })
  @Roles('public')
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }


  @ApiOperation({ summary: "Card id boyicha chiqarish" })
  @ApiResponse({
    status: 200,
    description: "Card id orqali kelganini chiqaish",
    type: Card,
  })
  @Roles('public')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }


  @ApiOperation({ summary: "Card id orqali yangilash qilish" })
  @ApiResponse({
    status: 200,
    description: "Card Yangilanganligi haqida xabar berish",
    type: Card,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }


  @ApiOperation({ summary: "Card o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Card o'chirish",
    type: Card,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
