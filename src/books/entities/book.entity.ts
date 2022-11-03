import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'books',
  timestamps: true,
})
export class Book {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  number_of_pages: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
