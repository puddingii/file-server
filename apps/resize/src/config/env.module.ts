import { AppConfig } from './env.schema';
import {
	TypedConfigModule,
	dotenvLoader,
	selectConfig,
} from 'nest-typed-config';

export const ConfigModule = TypedConfigModule.forRoot({
	schema: AppConfig,
	load: dotenvLoader({
		ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
	}),
	isGlobal: true,
});

export const envConfig = selectConfig(ConfigModule, AppConfig);
