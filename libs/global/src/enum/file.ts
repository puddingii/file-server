export const FileSize = {
	BYTE: 1,
	KB: 1024,
	MB: 1048576,
	GB: 1073741824,
} as const;

export const FileMaximumSize = {
	Image: FileSize.MB * 10,
	Video: FileSize.MB * 200,
	Other: FileSize.MB * 200,
} as const;

export const ImageMimeMapper = {
	'image/png': ['png'],
	'image/jpeg': ['jpeg', 'jpg'],
} as const;

type TImageMimeMapperValues = ('png' | 'jpeg' | 'jpg')[];
export const ImageFileExtList = Object.values(ImageMimeMapper).reduce(
	(acc, cur) => {
		acc.push(...cur);
		return acc;
	},
	[] as TImageMimeMapperValues,
);

type TImageMimeMapperKeys = keyof typeof ImageMimeMapper;
export const ImageFileMimeList = (
	Object.keys(ImageMimeMapper) as TImageMimeMapperKeys[]
).reduce((acc, cur) => {
	acc.push(cur);
	return acc;
}, [] as TImageMimeMapperKeys[]);

export default {
	FileMaximumSize,
	FileSize,
	ImageMimeMapper,
	ImageFileExtList,
	ImageFileMimeList,
};
