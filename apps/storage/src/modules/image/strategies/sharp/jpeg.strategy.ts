import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SharpStrategy } from '.';

@Injectable()
export class JpegStrategy extends SharpStrategy {
	async compressAndSave(info: { from: string; to: string }) {
		try {
			const { from, to } = info;

			const tool = this.getToolInstance();
			const compressResult = await tool(from).jpeg({ quality: 60 }).toFile(to);

			return compressResult;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
