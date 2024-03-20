import { Injectable } from '@nestjs/common';
import { mkdir, readFile, rm } from 'fs/promises';
import { SharpStrategy, TSharpStrategyInfo } from './sharp';

@Injectable()
export class ImageManager {
	private strategy = new SharpStrategy();

	private async createMainDirectory(path: string) {
		const result = await mkdir(path, { recursive: true });
		return result;
	}

	setStrategy(strategy: SharpStrategy) {
		this.strategy = strategy;
	}

	async compress<T extends TSharpStrategyInfo>(info: {
		mainName: string;
		tempName: string;
		savePath: string;
	}): Promise<ReturnType<T['compress']>> {
		const path = this.strategy.getMainDirectory(info.savePath);
		await this.createMainDirectory(path);

		const result = await this.strategy.compress(info);

		return result;
	}

	async deleteMainImage({ path, name }: { path: string; name: string }) {
		await rm(this.strategy.getMainDirectory(`${path}/${name}`), {
			force: true,
		});
	}

	async deleteTempImage(name: string) {
		await rm(this.strategy.getTempDirectory(name), {
			force: true,
		});
	}

	async getBufferImage({ path, name }: { path: string; name: string }) {
		const image = await readFile(
			this.strategy.getMainDirectory(`${path}/${name}`),
		);
		const type = name.split('.').at(-1);

		return { image, type };
	}
}
