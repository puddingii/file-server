import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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

export class GetImageDto extends PickType(ImageDto, ['path', 'name']) {}

export class UploadImageDto extends PickType(ImageDto, ['id', 'path']) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  beforeName?: string;
}

export class DeleteImageDto extends PickType(ImageDto, ['id', 'path', 'beforeName']) {}
