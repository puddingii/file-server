import { resolve } from 'path';

/** Server environment */
export enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test',
}

/** Message queue topic list */
export const enum KafkaTopic {
	IMAGE_TOPIC = 'image-topic',
}

/** The root of each microservice */
export const Root = resolve(__dirname, `../../`);
