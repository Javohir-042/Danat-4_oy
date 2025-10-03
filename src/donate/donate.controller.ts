import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DonateService } from './donate.service';
import { CreateDonateDto } from './dto/create-donate.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/admin.enum';
import { Donate } from './model/donate.model';

@ApiTags("Donat -- Donatlar")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPERADMIN)
@Controller('donate')
export class DonateController {
  constructor(private readonly donateService: DonateService) { }


  @ApiOperation({ summary: "Yangi donat qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Donat yaratildi",
    type: Donate
  })
  @Post()
  create(@Body() createDonateDto: CreateDonateDto) {
    return this.donateService.create(createDonateDto);
  }

  @ApiOperation({ summary: "Barcha donatlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Donatlar ro'yxati",
    type: [Donate]
  })
  @Get()
  findAll() {
    return this.donateService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha donat olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan donat",
    type: Donate
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donateService.findOne(+id);
  }

  @ApiOperation({ summary: "Donat yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan donat",
    type: Donate,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonateDto: UpdateDonateDto) {
    return this.donateService.update(+id, updateDonateDto);
  }

  @ApiOperation({ summary: "Donatni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Donat o'chirildi"
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donateService.remove(+id);
  }
}
