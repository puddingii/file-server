import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
	Get,
	HttpStatus,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Query,
	Res,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImageService } from './image.service';
import diskStorage from './storages/diskStorage';
import { DeleteImageDto, GetImageDto, UploadImageDto } from 'src/dto/image.dto';
import { FileMaximumSize, ImageFileExtList } from '@file/global/dist/enum/file';

@Controller('image')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Get(':path/:name')
	async getFile(@Param() imageDto: GetImageDto, @Res() res: Response) {
		const { image, type } = await this.imageService.getImage(imageDto);
		res.set({ 'Content-Type': `image/${type}` });

		res.send(image);
	}

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
		await this.imageService.uploadFile({ file, apiInfo: { ...imageDto } });

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
