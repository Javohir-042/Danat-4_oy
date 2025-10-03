import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './model/category.model';
import { Role } from '../common/enum/admin.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags("Category - Donat turlari")
@UseGuards(AuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @ApiOperation({ summary: `Category qo'shish` })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan foydalanuvchi",
    type: Category,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  @ApiBearerAuth()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: `Category ni malumotlarini ko'rish` })
  @ApiResponse({
    status: 201,
    description: "Barchasi ko'rsatildi",
    type: Category,
  })
  @Roles('public')
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: `Category by id malumolarini ko'rish` })
  @ApiResponse({
    status: 201,
    description: "category by id ko'rsatildi",
    type: Category,
  })
  @Roles('public')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: `Category by id orqali yangilash` })
  @ApiResponse({
    status: 201,
    description: "Yangilanga category id ko'rsatildi",
    type: Category,
  })
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: `Qategoryni by id orqali o'chirish` })
  @ApiResponse({
    status: 201,
    description: "O'chirildi",
    type: Category,
  })
  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
