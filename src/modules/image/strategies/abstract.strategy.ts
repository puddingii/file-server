import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export abstract class AbstractStrategy<T> {
	private mainDir = 'assets';
	private tempDir = 'temp';
	private rootDir = path.resolve(__dirname, `../../../../`);

	abstract compress(...args: any[]): Promise<any>;
	abstract getToolInstance(): T;
	abstract getFileName(file: any): string | false;

	getMainDirectory(additionalPath?: string) {
		const convertedPath = additionalPath ? `/${additionalPath}` : '';
		return path.resolve(this.rootDir, `${this.mainDir}${convertedPath}`);
	}

	getTempDirectory(additionalPath?: string) {
		const convertedPath = additionalPath ? `/${additionalPath}` : '';
		return path.resolve(this.rootDir, `${this.tempDir}${convertedPath}`);
	}
}
