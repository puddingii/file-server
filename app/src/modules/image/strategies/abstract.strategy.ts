import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { Root } from 'src/enum';

@Injectable()
export abstract class AbstractStrategy<T> {
	private mainDir = 'assets';
	private tempDir = 'temp';

	abstract compressAndSave(...args: unknown[]): Promise<unknown>;
	abstract getToolInstance(): T;
	abstract getFileName(file: unknown): string | false;

	getMainDirectory(additionalPath?: string) {
		const convertedPath = additionalPath ? `/${additionalPath}` : '';
		return path.resolve(Root, `${this.mainDir}${convertedPath}`);
	}

	getTempDirectory(additionalPath?: string) {
		const convertedPath = additionalPath ? `/${additionalPath}` : '';
		return path.resolve(Root, `${this.tempDir}${convertedPath}`);
	}
}
