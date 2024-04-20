import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNumber,
	IsString,
	Max,
	Min,
} from 'class-validator';
import { Environment } from 'src/enum';

export default class AppConfig {
	@IsEnum(Environment)
	NODE_ENV: Environment;

	@IsNumber()
	@Min(0)
	@Max(65535)
	@Type(() => Number)
	PORT: number;

	@IsString()
	ORIGIN_LIST_STR: string;

	@IsBoolean()
	get isDevelopment() {
		return this.NODE_ENV === Environment.Development;
	}

	@IsBoolean()
	get isProduction() {
		return this.NODE_ENV === Environment.Production;
	}

	@IsArray()
	get originList() {
		return this.ORIGIN_LIST_STR?.split(',').map((origin) => new RegExp(origin));
	}
}
