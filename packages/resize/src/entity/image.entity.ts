import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Image Resizing을 위한 Entity.
 * 추후 fit형식에 따라 클래스 이름을 변경해야 할 수도 있음
 */
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
