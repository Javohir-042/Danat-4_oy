import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { ResData } from '../lib/resDate';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<ResData<User | null>> {
    const { full_name, email, password, card_number, is_active } = createUserDto;

    if (!full_name || !email || !password || !card_number || is_active === undefined) {
      throw new NotFoundException('Iltimos barchasini kiriting')
    }

    const existsEmail = await this.userModel.findOne({ where: { email } })
    if (existsEmail) {
      throw new ConflictException('Email already exists')
    }

    const existsCard_number = await this.userModel.findOne({ where: { card_number } })
    if (existsCard_number) {
      throw new ConflictException('Card_number already esists')
    }

    const newUser = await this.userModel.create(createUserDto)

    return new ResData<User>("User create successFully", 201, newUser)
  }

  async findAll(): Promise<ResData<User[]>> {
    const user = await this.userModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })

    return new ResData('User successfully retrieved', 200, user);
  }

  async findOne(id: number): Promise<ResData<User>> {
    const user = await this.userModel.findByPk(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return new ResData('User retrieved by id', 200, user)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResData<User>> {
    const user = await this.userModel.findByPk(id)
    if (!user) {
      throw new NotFoundException('User not fuond')
    }

    const { email, card_number } = updateUserDto;

    if (email && email !== user.email) {
      throw new BadRequestException("Emailni o'zgartirish mumkin emas");
    }

    if (card_number && card_number !== user.card_number) {
      const existsCard = await this.userModel.findOne({ where: { card_number } })
      if (existsCard) {
        throw new BadRequestException('Bunday qarta raqami allaqachon mavjud ')
      }
    }

    const updateUser = await this.userModel.update(
      { ...updateUserDto },
      { where: { id }, returning: true }
    );

    return new ResData('User update successfully', 200, updateUser[1][0])
  }

  async remove(id: number) {
    const deleted = await this.userModel.destroy({ where: { id } })

    if (!deleted) {
      throw new NotFoundException('Bunday user mavjud emas')
    }
    return { message: `user o'chirildi` }
  }
}
