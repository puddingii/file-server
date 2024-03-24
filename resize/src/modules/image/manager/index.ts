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

	async resize(image: ArrayBuffer) {
		const options = (
			Object.keys(this.size) as (keyof typeof this.size)[]
		).reduce((acc: typeof this.size, cur) => {
			if (this.size[cur]) {
				acc[cur] = this.size[cur];
			}
			return acc;
		}, {});

		const resizedImage = await sharp(image)
			.resize({ ...options, fit: 'fill' })
			.toBuffer();

		return resizedImage;
	}
}
