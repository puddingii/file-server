import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { CacheModule } from '../node-cache/cache.module';

@Module({
	imports: [CacheModule.register(600)],
	controllers: [ImageController],
	providers: [ImageService],
})
export class ImageModule {}
