import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export abstract class AbstractStrategy<T> {
	private mainDir = 'assets';
	private tempDir = 'temp';
	private rootDir = path.resolve(__dirname, `../../../../`);
	abstract getToolInstance(): T;

	abstract compress(...args: any[]): Promise<any>;
	abstract getFileName(file: any): string | false;

	getMainDirectory(additionalPath: string) {
		return path.resolve(this.rootDir, `${this.mainDir}${`/${additionalPath}`}`);
	}

	getTempDirectory(additionalPath: string) {
		return path.resolve(this.rootDir, `${this.tempDir}${`/${additionalPath}`}`);
	}
}
