import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
	getHello(): string {
		return 'Hello World!';
	}
}
