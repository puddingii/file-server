import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, Max, Min } from 'class-validator';

enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test',
}

export default class AppConfig {
	@IsEnum(Environment)
	NODE_ENV: Environment;

	@IsNumber()
	@Min(0)
	@Max(65535)
	@Type(() => Number)
	PORT: number;

	@IsBoolean()
	get isDevelopment() {
		return this.NODE_ENV === Environment.Development;
	}

	@IsBoolean()
	get isProduction() {
		return this.NODE_ENV === Environment.Production;
	}
}
