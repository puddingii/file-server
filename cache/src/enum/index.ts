import { resolve } from 'path';

/** Server environment */
export enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test',
}

/** The root of each microservice */
export const Root = resolve(__dirname, `../../`);
