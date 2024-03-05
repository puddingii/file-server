import {
	// Body,
	Controller,
	Get,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import diskStorage from './storages/diskStorage';
// import { UploadImageDto } from 'src/dto/image.dto';

@Controller('image')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Get()
	getHello(): string {
		return this.imageService.getHello();
	}

	@Post('')
	@UseInterceptors(FileInterceptor('file', { storage: diskStorage }))
	uploadFile(
		@UploadedFile() file: Express.Multer.File,
		// @Body() imageDto: UploadImageDto,
	) {
		// console.log(imageDto);
		console.log(file);
	}
}
