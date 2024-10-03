import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImageModule } from './modules/image/image.module';
import { CacheModule } from './modules/node-cache/cache.module';
import { ConfigModule } from './config';

@Module({
	imports: [ConfigModule, ImageModule, CacheModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
