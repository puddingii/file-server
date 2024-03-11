import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AppConfig from './config';
import { ImageModule } from './modules/image/image.module';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		TypedConfigModule.forRoot({
			schema: AppConfig,
			load: dotenvLoader(),
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'assets'),
		}),
		ImageModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
