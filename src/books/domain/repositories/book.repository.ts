import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Book } from 'src/books/entities/book.entity';
import { IRepositoryInterface } from 'src/common/interfaces/repository.interface';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

export class BookRepository implements IRepositoryInterface {
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

  async findById(id: string): Promise<Book> {
    return this.model.findById(id);
  }

  async update(id: string, data: UpdateBookDto): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(
      {
        _id: id,
      },
      {
        ...data,
      },
    );
  }
}
