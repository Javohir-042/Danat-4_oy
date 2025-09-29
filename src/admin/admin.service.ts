import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './model/admin.model';
import { ResData } from '../lib/resDate';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<ResData<Admin | null>> {
    const { full_name, email, password, is_creator, is_active } = createAdminDto;

    if (!full_name || !email || !password || is_creator === undefined || is_active === undefined) {
      throw new NotFoundException("Iltimos barchasini kiriting")
    }

    // Email mavjudligini tekshirish
    const existsEmail = await this.adminModel.findOne({ where: { email } })
    if (existsEmail) {
      throw new ConflictException("Email already exists");
    }

    // Yangi admin yaratish
    const newAdmin = await this.adminModel.create(createAdminDto);

    return new ResData<Admin>("Admin create successFully", 201, newAdmin)
  }

  async findAll(): Promise<ResData<Admin[]>> {
    const admin = await this.adminModel.findAll({ include: { all: true }, order: [['id', 'ASC']] });

    return new ResData('Admin successfully retrieved', 200, admin)
  }

  async findOne(id: number): Promise<ResData<Admin>> {
    const admin = await this.adminModel.findByPk(id)
    if (!admin) {
      throw new NotFoundException('Admin not found')
    }
    return new ResData("Admin retrieved by id", 200, admin);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<ResData<Admin>> {

    const { email } = updateAdminDto;

    const existsAdmin = await this.adminModel.findByPk(id)
    if (!existsAdmin) {
      throw new NotFoundException('Admin not found');
    }

    if (email && email !== existsAdmin.email) {
      throw new BadRequestException("Emailni o'zgartirish mumkin emas");
    }


    const updateAdmin = await this.adminModel.update(
      { ...updateAdminDto },
      { where: { id }, returning: true }
    )

    return new ResData("Admin update by id ", 200, updateAdmin[1][0]);
  }

  async remove(id: number) {
    const deleted = await this.adminModel.destroy({ where: { id } })

    if (!deleted) {
      throw new NotFoundException('Bunday admin mavjud emas')
    }
    return { message: `admin o'chirildi` }
  }
}
