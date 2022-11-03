import { Injectable } from '@nestjs/common';
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
}
