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
