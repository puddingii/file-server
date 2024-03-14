import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SharpStrategy } from '.';

@Injectable()
export class JpegStrategy extends SharpStrategy {
	async compress(info: { savePath: string; file: string }) {
		try {
			const { file, savePath } = info;

			const mainDirectory = this.getMainDirectory(savePath);
			await this.createMainDirectory(mainDirectory);

			const tool = this.getToolInstance();
			const compressResult = await tool(this.getTempDirectory(file))
				.jpeg({ quality: 60 })
				.toFile(`${mainDirectory}/${file}`);

			return compressResult;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
