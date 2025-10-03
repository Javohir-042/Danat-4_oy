import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './model/payment.model';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/admin.enum';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { PaymentsService } from './payments.service';

@ApiTags("Payment - To'lovlar")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('payment')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) { }

  @ApiOperation({ summary: "Yangi to'lov qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi to'lov yaratildi",
    type: Payment,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }


  @ApiOperation({ summary: "Barcha to'lovlarni olish" })
  @ApiResponse({
    status: 200,
    description: "To'lovlar ro'yxati",
    type: [Payment],
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }


  @ApiOperation({ summary: "ID bo'yicha bitta to'lovni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan to'lov",
    type: Payment,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }


  @ApiOperation({ summary: "To'lovni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan to'lov",
    type: Payment,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }


  @ApiOperation({ summary: "To'lovni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "To'lov o'chirildi",
  })
  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
