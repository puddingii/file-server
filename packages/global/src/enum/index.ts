import { resolve } from 'path';
import FileEnum from './file';

export const Environment = {
	Development: 'development',
	Production: 'production',
	Test: 'test',
} as const;

export const KafkaTopic = {
	IMAGE_TOPIC: 'image-topic',
} as const;

export const Root = resolve(__dirname, `../../`);

export const File = FileEnum;

export default {
	File,
	Environment,
	KafkaTopic,
	Root,
};
