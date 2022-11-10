import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Queues } from './common/constants/enums/queues.enum';
import { RABBITMQ_URL } from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: Queues.BOOKS,
        noAck: false,
      },
    },
  );
  await app.listen();
}
bootstrap();
