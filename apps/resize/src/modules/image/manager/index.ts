import { Injectable, Logger } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageManager {
	private readonly logger = new Logger(ImageManager.name);
	private size: { height?: number; width?: number };

	setInit() {
		this.size = {};
	}

	setWidth(width: number) {
		this.size = { ...this.size, width };
	}

	setHeight(height: number) {
		this.size = { ...this.size, height };
	}

	setSize(info: typeof this.size) {
		this.size = { ...info };
	}

	/** 리사이징은 resize함수를 부르기 전 set함수로 세팅해둔 값으로 진행 */
	async resize(image: ArrayBuffer) {
		const options = Object.entries(this.size).reduce(
			(acc: typeof this.size, [key, value]) => {
				if (value) {
					acc[key] = value;
				}
				return acc;
			},
			{},
		);

		/** 단순히 사진을 리사이징하는 작업이므로 사진의 일부분이 잘리지 않도록 fill설정 */
		const resizedImage = await sharp(image)
			.resize({ ...options, fit: 'fill' })
			.toBuffer();

		return resizedImage;
	}
}
