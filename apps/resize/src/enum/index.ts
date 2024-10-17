import { resolve } from 'path';

export const Root = resolve(__dirname, '../../');
export const BuildRoot = resolve(__dirname, '../../../../../');
export const getFilePath = (filename: string, isBuild?: boolean) => {
	const root = isBuild ? BuildRoot : Root;
	return resolve(root, filename);
};
