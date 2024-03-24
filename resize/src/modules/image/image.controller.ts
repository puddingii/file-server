import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImageService } from './image.service';
import { ImageParamDto, ImageQueryDto } from 'src/dto/image.dto';

@Controller('image')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Get(':path/:name')
	async getFile(
		@Param() imageParam: ImageParamDto,
		@Query() imageQuery: ImageQueryDto,
		@Res() res: Response,
	) {
		let result: Buffer;
		if (imageQuery.height || imageQuery.width) {
			result = await this.imageService.resizeImage({
				...imageParam,
				...imageQuery,
			});
		} else {
			result = await this.imageService.getImageFromMain({ ...imageParam });
		}
		res.set({ 'Content-Type': `image/${imageParam.name.split('.').at(-1)}` });

		res.send(result);
	}
}
