import { Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import AppConfig from './config';
import { AppController } from './app.controller';
import { ImageModule } from './modules/image/image.module';
import { CacheModule } from './modules/node-cache/cache.module';

@Module({
	imports: [
		TypedConfigModule.forRoot({
			schema: AppConfig,
			load: dotenvLoader(),
			isGlobal: true,
		}),
		ImageModule,
		CacheModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
