import { AppConfig } from './env.schema';
import {
	TypedConfigModule,
	dotenvLoader,
	selectConfig,
} from 'nest-typed-config';
import { getFilePath } from 'src/enum';

const envFilePath =
	process.env.NODE_ENV === 'production'
		? getFilePath('.env', true)
		: getFilePath('.env.local', true);
export const ConfigModule = TypedConfigModule.forRoot({
	schema: AppConfig,
	load: dotenvLoader({
		ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
		envFilePath,
	}),
	isGlobal: true,
});

export const envConfig = selectConfig(ConfigModule, AppConfig);
