import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { performance } from 'perf_hooks';

import { ImageEntity } from 'src/entity/image.entity';
import { ImageManager } from './manager';

@Injectable()
export class ImageService {
	private readonly logger = new Logger(ImageService.name);

	constructor(
		private readonly imageManager: ImageManager,
		@Inject('RESIZE_IMAGE_MICROSERVICE')
		private readonly imageClient: ClientKafka,
	) {}

	async getImageFromMain({ path, name }: { path: string; name: string }) {
		const result = await fetch(`http://localhost:3032/image/${path}/${name}`, {
			method: 'get',
		});

		const image = await result.arrayBuffer();
		if (!image) {
			throw new BadRequestException('존재하지 않는 이미지 파일입니다.');
		}

		return Buffer.from(image);
	}

	async resizeImage(imageInfo: ImageEntity) {
		const { path, name, ...size } = imageInfo;

		const format = name.split('.').at(-1);
		const image = await this.getImageFromMain({ path, name });

		try {
			const startTime = performance.now();

			this.imageManager.setSize(size);
			const result = await this.imageManager.resize(image);

			const exeTime = performance.now() - startTime;

			this.logger.log(
				`${path}/${name} - ${format} ${size.width ?? '-'}/${size.height ?? '-'}px ${image.byteLength}>>${result.byteLength}byte +${Math.round(exeTime)}ms `,
			);

			return result;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
}
