import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import AppConfig from './config';
import { ImageModule } from './modules/image/image.module';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';

@Module({
	imports: [
		TypedConfigModule.forRoot({
			schema: AppConfig,
			load: dotenvLoader(),
			isGlobal: true,
		}),
		ImageModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
