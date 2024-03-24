import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { extension } from 'mime-types';
import { performance } from 'perf_hooks';

import { GetImageDto, UploadImageDto } from 'src/dto/image.dto';
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
		@Inject('IMAGE_MICROSERVICE') private readonly imageClient: ClientKafka,
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

	async compressAndSaveImage(imageInfo: {
		file: Express.Multer.File;
		apiInfo: Pick<UploadImageDto, 'id' | 'path'>;
	}) {
		const { apiInfo, file } = imageInfo;

		this.setImageManager(file.mimetype);

		try {
			const startTime = performance.now();
			/** originalname은 반드시 `${path}/image` 형식일것 */
			const { format, size } = await this.imageManager.compress({
				savePath: apiInfo.path,
				mainName: file.originalname,
				tempName: file.filename,
			});
			const exeTime = performance.now() - startTime;

			this.logger.log(
				`[${apiInfo.id}]${apiInfo.path}/${file.originalname} - ${format} ${file.size}>>${size}byte +${Math.round(exeTime)}ms `,
			);

			return { format, size, exeTime };
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async deleteImage(imageInfo: { path?: string; name: string; isTemp?: true }) {
		const { name, path, isTemp } = imageInfo;
		if (!isTemp && path) {
			await this.imageManager.deleteMainImage({ path, name });
			return;
		}

		await this.imageManager.deleteTempImage(name);
	}

	async getImage(imageInfo: GetImageDto) {
		const { path, name } = imageInfo;
		const result = await this.imageManager.getBufferImage({
			path: `${path}/image`,
			name,
		});

		return result;
	}

	async uploadFile(imageInfo: {
		file: Express.Multer.File;
		apiInfo: UploadImageDto;
	}) {
		const {
			apiInfo: { id, path, beforeName },
			file,
		} = imageInfo;

		const { exeTime, format, size } = await this.compressAndSaveImage({
			file,
			apiInfo: { id, path },
		});
		this.imageClient.emit('image-topic', {
			key: 'uploadResult-json',
			value: JSON.stringify({
				id,
				format,
				size,
				exeTime,
			}),
		});

		await this.deleteImage({ isTemp: true, name: file.filename });
		if (beforeName) {
			await this.deleteImage({ path, name: beforeName });
		}
	}
}
