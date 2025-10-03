import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { ResData } from '../lib/resDate';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<ResData<Category | null>> {
    const { name } = createCategoryDto;

    if (!name) {
      throw new NotFoundException("Name not found")
    }

    const newCategory = await this.categoryModel.create(createCategoryDto);

    return new ResData<Category>("Category create successFully", 201, newCategory)
  }

  async findAll(): Promise<ResData<Category[]>> {
    const category = await this.categoryModel.findAll({ include: { all: true }, order: [['id', 'ASC']] })

    return new ResData('Category successFully retrieved', 200, category)
  }

  async findOne(id: number): Promise<ResData<Category>> {
    const category = await this.categoryModel.findByPk(id, { include: { all: true } })
    if (!category) {
      throw new NotFoundException("Category not found")
    }

    return new ResData("Category retrieved by id", 200, category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<ResData<Category>> {
    const category = await this.categoryModel.findByPk(id)
    if (!category) {
      throw new NotFoundException("Category not found")
    }

    const updateCategory = await this.categoryModel.update(updateCategoryDto, { where: { id }, returning: true })

    return new ResData("Category update by id", 200, updateCategory[1][0]);
  }

  async remove(id: number) {
    const deleted = await this.categoryModel.destroy({ where: { id } })

    if (!deleted) {
      throw new NotFoundException('Bunday Category mavjud emas')
    }
    return { message: `Category o'chirildi` }
  }
}
