import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/books/entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';

export class BookRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly model: Model<Book>,
  ) {}

  async create(data: CreateBookDto): Promise<Book> {
    const book = await this.model.create({
      ...data,
    });

    if (!book)
      throw new RpcException(`Was not possible to create book instance`);

    return book;
  }

  async list(): Promise<Array<Book>> {
    const books = await this.model.find();

    return books;
  }
}
