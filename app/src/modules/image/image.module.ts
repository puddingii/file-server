import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { JpegStrategy } from './strategies/sharp/jpeg.strategy';
import { PngStrategy } from './strategies/sharp/png.strategy';
import { ImageManager } from './strategies/manager';

const strategyList = [JpegStrategy, PngStrategy, ImageManager];
@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'IMAGE_MICROSERVICE',
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
	providers: [ImageService, ...strategyList],
})
export class ImageModule {}
