import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { IRepositoryInterface } from '../../../common/interfaces/repository.interface';
import { CreateCategoryDto } from '../dto/create-category.dto';

export class CategoryRepository implements IRepositoryInterface {
  constructor(
    @InjectModel(Category.name)
    private readonly model: Model<Category>,
  ) {}

  async findByName(name: string): Promise<Category> {
    return this.model.findOne({
      name,
    });
  }

  create(data: CreateCategoryDto): Promise<Category> {
    return this.model.create({
      ...data,
    });
  }

  async list(): Promise<Array<Category>> {
    const categories = await this.model.find();

    return categories;
  }

  async findById(id: string): Promise<Category> {
    return this.model.findById(id);
  }
}
