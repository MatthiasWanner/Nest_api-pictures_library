import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePictureDto } from './create-picture.dto';

export class UpdatePictureDto extends PartialType(
  OmitType(CreatePictureDto, ['url'] as const),
) {}
