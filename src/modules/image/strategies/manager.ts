import { Injectable } from '@nestjs/common';
import { mkdir } from 'fs/promises';
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
}
