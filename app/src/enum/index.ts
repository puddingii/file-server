import { resolve } from 'path';

export enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test',
}

export const enum FileSize {
	BYTE = 1,
	KB = 1024,
	MB = 1048576,
	GB = 1073741824,
}

export const enum FileMaximumSize {
	Image = FileSize.MB * 10,
	Video = FileSize.MB * 200,
	Other = FileSize.MB * 200,
}

export const enum KafkaTopic {
	IMAGE_TOPIC = 'image-topic',
}

export const ImageMimeMapper = {
	'image/png': ['png'],
	'image/jpeg': ['jpeg', 'jpg'],
} as const;

type TImageMimeMapperKeys = keyof typeof ImageMimeMapper;

export const ImageFileExtList = Object.values(ImageMimeMapper).reduce(
	(acc, cur) => {
		acc.push(...cur);
		return acc;
	},
	[] as string[],
);

export const ImageFileMimeList = (
	Object.keys(ImageMimeMapper) as TImageMimeMapperKeys[]
).reduce((acc, cur) => {
	acc.push(cur);
	return acc;
}, [] as TImageMimeMapperKeys[]);

export const Root = resolve(__dirname, `../../`);
