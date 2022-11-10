import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './domain/dto/create-book.dto';
import { UpdateBookOperation } from './domain/dto/update-book-operation.dto';
import { BookRepository } from './domain/repositories/book.repository';

@Injectable()
export class BooksService {
  constructor(private readonly repository: BookRepository) {}

  create(data: CreateBookDto) {
    return this.repository.create(data);
  }

  list() {
    return this.repository.list();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  async update(data: UpdateBookOperation) {
    await this.findById(data.id);

    await this.repository.update(data.id, data.data);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
