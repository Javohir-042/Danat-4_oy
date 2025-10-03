import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './model/order.model';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/admin.enum';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags("Order - Buyurtmalar")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiOperation({ summary: "Yangi buyurtma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi buyurtma yaratildi",
    type: Order,
  })
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: "Barcha buyurtmalar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtmalar ro'yxati",
    type: [Order],
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha buyurtma olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan buyurtma",
    type: Order,
  })
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: "Buyurtmani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan buyurtma",
    type: Order,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: "Buyurtmani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma o'chirildi",
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
