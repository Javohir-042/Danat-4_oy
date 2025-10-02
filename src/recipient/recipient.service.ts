import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Recipient } from './model/recipient.model';
import { ResData } from '../lib/resDate';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RecipientService {
  constructor(
    @InjectModel(Recipient) private readonly recipentModel: typeof Recipient,
  ) { }

  async create(createRecipientDto: CreateRecipientDto): Promise<ResData<Recipient | null>> {

    const { name, full_name, email, password, addres, role } = createRecipientDto
    
    if (!name || !full_name || !email || !password || !addres || !role) {
      throw new NotFoundException("Iltimos Barchasini kiriting")
    }
    
    const existsName = await this.recipentModel.findOne({ where: { name } })
    if (existsName) {
      throw new ConflictException("Name already exists")
    }
    
    const existsEmail = await this.recipentModel.findOne({ where: { email } })
    if (existsEmail) {
      throw new ConflictException("Email already exists")
    }
    
    console.log(name, full_name, email, password,addres, role)
    const newRecipirnt = await this.recipentModel.create({ ...createRecipientDto})

    return new ResData<Recipient>('Recipient create successfully', 201, newRecipirnt)
  }

  async findAll(): Promise<ResData<Recipient[]>> {
    const recipient = await this.recipentModel.findAll()
    console.log('dgdgdfg')
    return new ResData('Recipient successfully retrieved', 200, recipient)
  }

  async findOne(id: number): Promise<ResData<Recipient>> {
    const recipient = await this.recipentModel.findByPk(id)
    if (!recipient) {
      throw new NotFoundException("Recipient not found")
    }
    return new ResData('Admin retrieved by id', 200, recipient);
  }

  async update(id: number, updateRecipientDto: UpdateRecipientDto): Promise<ResData<Recipient>> {
    const recipient = await this.recipentModel.findByPk(id)
    if (!recipient) {
      throw new NotFoundException('Recipient not found')
    }

    const { name, email, currentPassword, password } = updateRecipientDto

    if (email && email !== recipient.email) {
      throw new BadRequestException(`Email o'zgartirish mumkun emas`)
    }

    if (name) {
      const existsName = await this.recipentModel.findOne({ where: { name } })
      if (existsName && existsName.id !== id) {
        throw new BadRequestException('Bunday name mavjud')
      }
    }

    if (password && currentPassword) {
      const verifyPassword = await bcrypt.compare(currentPassword, recipient.password);
      if (!verifyPassword) {
        throw new UnauthorizedException("Password noto'g'ri");
      }
      updateRecipientDto.password = await bcrypt.hash(password, 7);
    }

    const recipientd = await this.recipentModel.update(updateRecipientDto, { where: { id }, returning: true })

    return new ResData('Recipient update by id ', 200, recipientd[1][0])
  }

  async remove(id: number) {
    const recipient = await this.recipentModel.destroy({where: {id}})
    if(!recipient){
      throw new NotFoundException('RecipientId not found')
    }

    return { message: `recipient o'chirildi` }
  }
}
