import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
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
import { FileMaximumSize, ImageFileExtList } from 'src/enum';
import { Response } from 'express';

@Controller('image')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file', { storage: diskStorage }))
	async uploadFile(
		@Res()
		res: Response,
		@Body() imageDto: UploadImageDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: FileMaximumSize.Image }),
					new FileTypeValidator({
						fileType: `.(${ImageFileExtList.join('|')})`,
					}),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		const { id, path, beforeName } = imageDto;
		await this.imageService.compressImage({ file, apiInfo: { id, path } });
		if (imageDto.beforeName) {
			await this.deleteFile({ id, path, beforeName });
		}

		res.send('');
	}

	@Delete()
	async deleteFile(@Query() imageDto: DeleteImageDto) {
		console.log('delete', imageDto);
	}
}
