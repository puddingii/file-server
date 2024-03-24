import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ImageEntity {
	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	width?: number;

	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	height?: number;

	@IsString()
	@IsNotEmpty()
	path: string;

	@IsString()
	@IsNotEmpty()
	name: string;
}
