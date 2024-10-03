import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

import { ImageManager } from './manager';
import { envConfig } from 'src/config/env.module';

const KafkaModule = ClientsModule.register([
	{
		name: 'RESIZE_IMAGE_MICROSERVICE',
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: 'image',
				brokers: envConfig.kafkaClientBrokerList,
			},
			producer: {
				allowAutoTopicCreation: true,
				createPartitioner: Partitioners.LegacyPartitioner,
			},
			producerOnlyMode: true,
		},
	},
]);

@Module({})
export class ImageModule {
	static register() {
		return {
			imports: [KafkaModule],
			controllers: [ImageController],
			providers: [ImageService, ImageManager],
		};
	}
}
