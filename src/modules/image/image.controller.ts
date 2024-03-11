import {
	Body,
	Controller,
	Delete,
	// FileTypeValidator,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	Query,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import diskStorage from './storages/diskStorage';
import { DeleteImageDto, UploadImageDto } from 'src/dto/image.dto';
import { FileMaximumSize } from 'src/enum';
import { Response } from 'express';

@Controller('image')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file', { storage: diskStorage }))
	uploadFile(
		@Res()
		res: Response,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: FileMaximumSize.Image }),
					// new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
				],
			}),
		)
		file: Express.Multer.File,
		@Body() imageDto: UploadImageDto,
	) {
		console.log(imageDto);
		console.log(file);

		res.send('');
	}

	@Delete()
	deleteFile(@Query() imageDto: DeleteImageDto) {
		console.log(imageDto);
	}
}
