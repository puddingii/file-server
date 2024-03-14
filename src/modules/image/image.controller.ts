import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
	HttpStatus,
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
		if (beforeName) {
			await this.imageService.deleteImage({ path, name: beforeName });
		}

		res.sendStatus(HttpStatus.CREATED);
	}

	@Delete()
	async deleteFile(
		@Res()
		res: Response,
		@Query() imageDto: DeleteImageDto,
	) {
		await this.imageService.deleteImage({
			name: imageDto.beforeName,
			path: imageDto.path,
		});

		res.sendStatus(HttpStatus.OK);
	}
}
