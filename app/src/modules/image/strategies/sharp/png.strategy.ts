import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SharpStrategy } from '.';

@Injectable()
export class PngStrategy extends SharpStrategy {
	async compress(info: {
		savePath: string;
		mainName: string;
		tempName: string;
	}) {
		try {
			const { mainName, tempName, savePath } = info;

			const tool = this.getToolInstance();
			const compressResult = await tool(this.getTempDirectory(tempName))
				.png({
					compressionLevel: 5,
				})
				.toFile(this.getMainDirectory(`${savePath}/${mainName}`));

			return compressResult;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
