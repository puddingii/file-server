import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
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

	/** 메인 서버로부터 이미지 데이터 가져오기. Buffer형태로 리턴 */
	async getImageFromMain({ path, name }: { path: string; name: string }) {
		const result = await fetch(`http://localhost:3032/image/${path}/${name}`, {
			method: 'get',
		});

		const image = await result.arrayBuffer();
		/** 데이터가 없을 시 클라이언트에서 잘못 요청하거나 DB에 주소나 이름 값이 잘못된거임 */
		if (!image) {
			throw new NotFoundException('존재하지 않는 이미지 파일입니다.');
		}

		return Buffer.from(image);
	}

	/** Width, Height으로 리사이징 */
	async resizeImage(imageInfo: ImageEntity) {
		const { path, name, ...size } = imageInfo;

		const format = name.split('.').at(-1);
		const image = await this.getImageFromMain({ path, name });

		try {
			const startTime = performance.now();

			this.imageManager.setSize(size);
			const result = await this.imageManager.resize(image);

			const exeTime = performance.now() - startTime;

			/** 추후 분석 서버로 결과 이벤트를 전달할 수도 있음.(Kafka 사용 예정) */
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
