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

	@IsString()
	@IsNotEmpty()
	beforeName: string;
}

export class UploadImageDto extends PickType(ImageDto, ['path', 'id']) {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	beforeName?: string;
}

export class DeleteImageDto extends ImageDto {}
