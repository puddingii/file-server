import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ImageDto {
	@IsString()
	@IsNotEmpty()
	path: string;

	@Type(() => Number)
	@IsNumber()
	@IsNotEmpty()
	id: number;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	beforeName: string;
}

export class UploadImageDto extends ImageDto {}

export class DeleteImageDto extends PickType(ImageDto, [
	'path',
	'id',
] as const) {}
