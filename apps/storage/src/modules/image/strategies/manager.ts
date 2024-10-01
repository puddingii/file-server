import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { mkdir, readFile, rm } from 'fs/promises';
import { SharpStrategy } from './sharp';

@Injectable()
export class ImageManager {
	private strategy = new SharpStrategy();

	private async createMainDirectory(path: string) {
		const result = await mkdir(path, { recursive: true });
		return result;
	}

	/** Main path의 형태는 무조건 `${path}/image`일것 */
	private checkValidMainPath(path: string) {
		if (path.split('/').at(-1) !== 'image') {
			throw new BadRequestException('Main image path의 형식이 잘못되었습니다.');
		}
	}

	setStrategy(strategy: SharpStrategy) {
		this.strategy = strategy;
	}

	/** Temp 폴더에 있는 이미지를 압축하고 Main폴더에 저장 */
	async saveImageFromTemp<T extends SharpStrategy>(info: {
		mainName: string;
		tempName: string;
		savePath: string;
	}): Promise<Awaited<ReturnType<T['compressAndSave']>>> {
		const { mainName, savePath, tempName } = info;
		this.checkValidMainPath(savePath);

		/** Save하기 전에 미리 Directory 생성 */
		const path = this.strategy.getMainDirectory(savePath);
		await this.createMainDirectory(path);

		/** 압축 및 저장 */
		const result = (await this.strategy.compressAndSave({
			from: this.strategy.getTempDirectory(tempName),
			to: this.strategy.getMainDirectory(`${savePath}/${mainName}`),
		})) as Awaited<ReturnType<T['compressAndSave']>>;

		return result;
	}

	/** Main 폴더에 있는 이미지 제거 */
	async deleteMainImage({ path, name }: { path: string; name: string }) {
		this.checkValidMainPath(path);
		await rm(this.strategy.getMainDirectory(`${path}/${name}`), {
			force: true,
		});
	}

	/** Temp 폴더에 있는 이미지 제거 */
	async deleteTempImage(name: string) {
		await rm(this.strategy.getTempDirectory(name), {
			force: true,
		});
	}

	/** Buffer 형태의 이미지 데이터 가져오기 */
	async getBufferImage({ path, name }: { path: string; name: string }) {
		this.checkValidMainPath(path);
		try {
			const image = await readFile(
				this.strategy.getMainDirectory(`${path}/${name}`),
			);
			const type = name.split('.').at(-1);

			return { image, type };
		} catch (error) {
			throw new NotFoundException(
				'파일이 존재하지 않거나 불러올 수 없는 상태입니다.',
			);
		}
	}
}
