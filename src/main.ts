import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import AppConfig from './config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const { PORT, isDevelopment, isProduction } = app.get(AppConfig);

	app.enableCors({ origin: '*', credentials: true });
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			enableDebugMessages: isDevelopment,
			disableErrorMessages: isProduction,
		}),
	);

	await app.listen(PORT, () => {
		console.log(`Nest on: http://localhost:${PORT}`);
	});
}
bootstrap();
