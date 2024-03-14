import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { extension } from 'mime-types';
import * as fs from 'fs/promises';
import { resolve } from 'path';
import { UploadImageDto } from 'src/dto/image.dto';
import { PngStrategy } from './strategies/sharp/png.strategy';
import { JpegStrategy } from './strategies/sharp/jpeg.strategy';
import { ImageManager } from './strategies/manager';

@Injectable()
export class ImageService {
	private readonly logger = new Logger(ImageService.name);

	constructor(
		private readonly pngStrategy: PngStrategy,
		private readonly jpegStrategy: JpegStrategy,
		private readonly imageManager: ImageManager,
	) {}

	private getExt(mimeType: string) {
		const ext = extension(mimeType);
		if (!this.isExtValid(ext)) {
			throw new BadRequestException('알 수 없는 MIME type 입니다.');
		}

		return ext;
	}

	private getStrategy(ext: string) {
		switch (ext) {
			case 'png':
				return this.pngStrategy;
			case 'jpeg':
			case 'jpg':
				return this.jpegStrategy;
			default:
				throw new BadRequestException('알 수 없는 MIME type 입니다.');
		}
	}

	private setImageManager(mimetype: string) {
		const ext = this.getExt(mimetype);
		const strategy = this.getStrategy(ext);
		this.imageManager.setStrategy(strategy);
	}

	private isExtValid(ext: string | boolean): ext is string {
		return typeof ext === 'string';
	}

	async compressImage(imageInfo: {
		file: Express.Multer.File;
		apiInfo: Pick<UploadImageDto, 'id' | 'path'>;
	}) {
		const { apiInfo, file } = imageInfo;

		this.setImageManager(file.mimetype);

		const compressResult = await this.imageManager.compress({
			savePath: apiInfo.path,
			mainName: file.originalname,
			tempName: file.filename,
		});
		console.log(compressResult);
		// TODO Message queue emit 작업 필요.
	}

	async deleteImage(imageInfo: { path: string; name: string }) {
		const { name, path } = imageInfo;
		await fs.rm(resolve(__dirname, `../../../assets/${path}/${name}`), {
			force: true,
		});
	}
}
