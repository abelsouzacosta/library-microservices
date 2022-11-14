import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';
import { CategoryRepository } from './domain/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async nameShouldBeUnique(name: string) {
    const category = await this.repository.findByName(name);

    if (category) throw new RpcException(`Category name already taken`);
  }

  async create(data: CreateCategoryDto) {
    await this.nameShouldBeUnique(data.name);

    return this.repository.create(data);
  }

  findAll() {
    return this.repository.list();
  }

  async findOne(id: string) {
    const category = await this.repository.findById(id);

    if (!category) throw new RpcException(`Category not found`);

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
