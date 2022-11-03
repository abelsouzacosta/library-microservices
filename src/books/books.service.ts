import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateBookDto } from './domain/dto/create-book.dto';
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

  async findById(id: string) {
    const book = await this.repository.findById(id);

    if (!book) throw new RpcException(`Book ${id} not found`);

    return book;
  }
}
