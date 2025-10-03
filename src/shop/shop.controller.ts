import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Shop } from './model/shop.model';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/admin.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags("Shop - Do'kon")
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @ApiOperation({ summary: `Yangi mahsulot qo'shish` })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan mahsulot",
    type: Shop,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @ApiOperation({ summary: `Barcha mahsulotlarni ko'rish` })
  @ApiResponse({
    status: 200,
    description: "Mahsulotlar ro'yxati",
    type: [Shop],
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha mahsulotni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan mahsulot",
    type: Shop,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }

  @ApiOperation({ summary: "Mahsulotni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan mahsulot",
    type: Shop,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @ApiOperation({ summary: "Mahsulotni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirildi haqida xabar",
  })
  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }
}
