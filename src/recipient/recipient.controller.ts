import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/admin.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Recipient } from './model/recipient.model';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags("Recipient - Qabul qiluvchi")
@UseGuards(AuthGuard, RolesGuard)
@Controller('recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) { }


  @ApiOperation({ summary: `Foydalanuvchi qo'shish` })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan foydalanuvchi",
    type: Recipient,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Post()
  @ApiBearerAuth()
  create(@Body() createRecipientDto: CreateRecipientDto) {
    return this.recipientService.create(createRecipientDto);
  }


  @ApiOperation({
    summary: "Foydalanuvchi ro'yxatini chiqarish"
  })
  @ApiResponse({
    status: 200,
    description: "foydalanuvchilar ro'yxati",
    type: [Recipient],
  })
  @Roles('public')
  @Get()
  findAll() {
    return this.recipientService.findAll();
  }

  
  @ApiOperation({
    summary: "Foydalanuvchi ro'yxatini by id orqali chiqarish"
  })
  @ApiResponse({
    status: 200,
    description: "foydalanuvchilar by id ro'yxati",
    type: [Recipient],
  })
  @Roles('public')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientService.findOne(+id);
  }


  @ApiOperation({ summary: `Foydalanuvchi yangilash` })
  @ApiResponse({
    status: 201,
    description: "O'zgartirilgan foydalanuvchi",
    type: Recipient,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipientDto: UpdateRecipientDto) {
    return this.recipientService.update(+id, updateRecipientDto);
  }


  @ApiOperation({ summary: `Foydalanuvchi o'chirish` })
  @ApiResponse({
    status: 201,
    description: "O'chirilgan foydalanuvchi",
    type: Recipient,
  })
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipientService.remove(+id);
  }
}
