import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { EventPatterns } from 'src/common/constants/enums/event-patterns.enum';
import { MessagePatterns } from 'src/common/constants/enums/message-patterns.enum';
import { BooksService } from './books.service';
import { CreateBookDto } from './domain/dto/create-book.dto';
import { UpdateBookOperation } from './domain/dto/update-book-operation.dto';

@Controller()
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @EventPattern(EventPatterns.CREATE_BOOK)
  async create(@Payload() data: CreateBookDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.service.create(data);

      await channel.ack(message);
    } catch (error) {
      await channel.ack(message);
    }
  }

  @MessagePattern(MessagePatterns.LIST_BOOKS)
  list() {
    return this.service.list();
  }

  @MessagePattern(MessagePatterns.GET_BOOK)
  findById(@Payload() id: string) {
    return this.service.findById(id);
  }

  @EventPattern(EventPatterns.UPDATE_BOOK)
  async update(
    @Payload() data: UpdateBookOperation,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.service.update(data);

      await channel.ack(message);
    } catch (error) {
      await channel.ack(message);
    }
  }
}
