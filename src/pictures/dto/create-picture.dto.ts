import { OmitType } from '@nestjs/swagger';
import { Picture } from '../entities/picture.entity';

export class CreatePictureDto extends OmitType(Picture, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
