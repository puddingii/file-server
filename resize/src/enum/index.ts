import { resolve } from 'path';

export enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test',
}

export const enum KafkaTopic {
	IMAGE_TOPIC = 'image-topic',
}

export const Root = resolve(__dirname, `../../`);
