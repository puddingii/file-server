import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

import { ImageManager } from './manager';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'RESIZE_IMAGE_MICROSERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'image',
						brokers: ['localhost:9094'],
					},
					producer: {
						allowAutoTopicCreation: true,
						createPartitioner: Partitioners.LegacyPartitioner,
					},
					producerOnlyMode: true,
				},
			},
		]),
	],
	controllers: [ImageController],
	providers: [ImageService, ImageManager],
})
export class ImageModule {}
