import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppConfig } from './config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const logger = new Logger();
	const {
		PORT,
		isDevelopment,
		isProduction,
		originList,
		kafkaClientBrokerList,
	} = app.get(AppConfig);

	app.enableCors({ origin: originList, credentials: true });
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			enableDebugMessages: isDevelopment,
			disableErrorMessages: isProduction,
		}),
	);
	app.connectMicroservice({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: 'image',
				brokers: kafkaClientBrokerList,
			},
			producer: {
				allowAutoTopicCreation: true,
			},
			producerOnlyMode: true,
		},
	});

	await app.listen(PORT, () => {
		logger.log(`Nest on: http://localhost:${PORT}`);
	});
}
bootstrap();
