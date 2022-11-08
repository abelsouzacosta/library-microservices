import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/enums/message-patterns.enum';
import { BooksService } from './books.service';
import { CreateBookDto } from './domain/dto/create-book.dto';
import { UpdateBookOperation } from './domain/dto/update-book-operation.dto';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern(MessagePatterns.CREATE_BOOK)
  create(@Payload() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @MessagePattern(MessagePatterns.LIST_BOOKS)
  list() {
    return this.booksService.list();
  }

  @MessagePattern(MessagePatterns.GET_BOOK)
  findById(@Payload() id: string) {
    return this.booksService.findById(id);
  }

  @MessagePattern(MessagePatterns.UPDATE_BOOK)
  update(@Payload() data: UpdateBookOperation) {
    return this.booksService.update(data);
  }
}
