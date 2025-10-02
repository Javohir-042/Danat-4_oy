import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/admin.enum';

@ApiTags("User - odam")
@ApiBearerAuth()
@UseGuards(AuthGuard,RolesGuard)
@Roles(Role.ADMIN, Role.SUPERADMIN)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "User qoshish"})
  @ApiResponse({
    status: 200,
    description: "User qo'shildi"
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: "Userni ko'rish" })
  @ApiResponse({
    status: 200,
    description: "User ko'rindi"
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "User by id orqali korish" })
  @ApiResponse({
    status: 200,
    description: "User by id orqali ko'rindi"
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: "User yangilash" })
  @ApiResponse({
    status: 200,
    description: "User yangilandi"
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "User o'chirish" })
  @ApiResponse({
    status: 200,
    description: "User o'chirish"
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
