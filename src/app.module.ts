import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
	providers: [AppService],
})
export class AppModule {}
