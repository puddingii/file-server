import { IsInt, IsString } from 'class-validator';

export class UploadImageDto {
	@IsString({ always: false })
	path: string;

	@IsString({ always: false })
	name: string;

	@IsInt({ always: false })
	size: number;
}
