import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { JpegStrategy } from './strategies/sharp/jpeg.strategy';
import { PngStrategy } from './strategies/sharp/png.strategy';
import { ImageManager } from './strategies/manager';

const strategyList = [JpegStrategy, PngStrategy, ImageManager];
@Module({
	imports: [],
	controllers: [ImageController],
	providers: [ImageService, ...strategyList],
})
export class ImageModule {}
