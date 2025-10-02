import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './model/admin.model';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/admin.enum';

@ApiTags("Admin - Foydalanuvchi")
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }


  @ApiOperation({ summary: `Foydalanuvchi qo'shish` })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan foydalanuvchi",
    type: Admin,
  })
  @Roles( Role.SUPERADMIN)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }



  @Roles(Role.ADMIN, Role.SUPERADMIN)
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


  @Roles(Role.ADMIN, Role.SUPERADMIN)
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

  @Roles(Role.ADMIN, Role.SUPERADMIN)
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

  @Roles( Role.SUPERADMIN)
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
