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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @EventPattern(EventPatterns.CREATE_CATEGORY)
  async create(@Payload() data: CreateCategoryDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      await this.service.create(data);

      await channel.ack(message);
    } catch (error) {
      await channel.ack(message);
    }
  }

  @MessagePattern(MessagePatterns.LIST_CATEGORIES)
  findAll() {
    return this.service.findAll();
  }

  @MessagePattern('findOneCategory')
  findOne(@Payload() id: number) {
    return this.service.findOne(id);
  }

  @MessagePattern('updateCategory')
  update(@Payload() updateCategoryDto: UpdateCategoryDto) {
    return this.service.update(updateCategoryDto.id, updateCategoryDto);
  }

  @MessagePattern('removeCategory')
  remove(@Payload() id: number) {
    return this.service.remove(id);
  }
}
