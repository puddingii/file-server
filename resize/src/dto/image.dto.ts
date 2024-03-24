import { PickType } from '@nestjs/mapped-types';
import { ImageEntity } from 'src/entity/image.entity';

export class ImageParamDto extends PickType(ImageEntity, ['name', 'path']) {}
export class ImageQueryDto extends PickType(ImageEntity, ['height', 'width']) {}
