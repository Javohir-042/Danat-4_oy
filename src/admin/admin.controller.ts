import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './model/admin.model';


@ApiTags("Admin - Foydalanuvchi")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: `Foydalanuvchi qo'shish`})
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan foydalanuvchi",
    type: Admin,
  })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({
    summary: "Foydalanuvchi ro'yxatini chiqarish"
  })
  @ApiResponse({
    status: 200,
    description: "foydalanuvchilar ro'yxati",
    type: [Admin],
  })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha bitta foydalanuvchini olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan foydalanuvchi",
    type: Admin,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan foydalanuvchi",
    type: Admin,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirish natijasi haqida xabar",
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
